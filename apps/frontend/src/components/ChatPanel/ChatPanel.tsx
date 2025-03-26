import { useState } from "react";
import { Avatar, Box, Chip, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CircleIcon from '@mui/icons-material/Circle';

import { ChatPanelProps } from './ChatPanel.types'
import { ChatPanelContainer }  from './ChatPanel.style'
import { ChatType, formatMessageDateAgo } from "../../common";
import { useAuthentication, useChatApi } from "../../hooks";

type ChatPanelHeaderProps = {
  query: string;
  onChangeQuery: (query: string) => void;
}

type ChatPanelListProps = {
  chats: ChatType[];
}

function ChatPanelHeader(props: ChatPanelHeaderProps) {

  /** Context */

  const { user } = useAuthentication();
  const { chats } = useChatApi();

  /** Vars */

  const newMessages =
    chats.reduce((count, chat) => chat.messages.length === 0
      ? count
      : chat.messages.filter((msg) => msg.user.id !== user?.id && msg.isRead === false).length > 0
      ? count + 1
      : count
    , 0)

  return (
    <>
      <Box
        id="chat__panel_header"
      >
        <Stack
          direction='column'
          gap={2}
        >
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            gap={1}
          >
            <Typography>
              Messages
            </Typography>
            {newMessages > 0 && (
              <Chip
                label={newMessages}
                size='small'
              />
            )}
          </Stack>

          <TextField
            variant='outlined'
            size='small'
            placeholder="Search"
            value={props.query}
            onChange={(evt) => props.onChangeQuery(evt.currentTarget.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                  >
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                )
              }
            }}
          />
        </Stack>
      </Box>
    </>
  )
}

function ChatPanelList(props: ChatPanelListProps) {
  
  /** Context */

  const { user } = useAuthentication();
  const {
    selectedChat,
    onSelectedChat,
  } = useChatApi();

  return (
    <>
      <List
        id="chat__panel_list"
      >
        {props.chats.map((chat: ChatType, key) => {
          
          if (chat.messages.length === 0) {
            return null;
          }

          const lastMessage = chat.messages[chat.messages.length - 1];

          return (
            <ListItem
              key={key}
              disablePadding
            >
              <ListItemButton
                selected={chat.id === selectedChat?.id}
                onClick={() => onSelectedChat(chat)}
              >
                <ListItemIcon>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemIcon>

                <ListItemText
                  primary={(
                    <Typography
                      variant='caption'
                    >
                      {chat.creator.id === user?.id
                        ? chat.invited.username
                        : chat.creator.username
                      }
                    </Typography>
                  )}
                  secondary={(
                    <Typography
                      variant='caption'
                      color='textDisabled'
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '125px',
                      }}
                    >
                      {lastMessage.text}
                    </Typography>
                  )}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}
                />

                <ListItemText
                  primary={(
                    <Typography
                      variant='caption'
                      color='textDisabled'
                    >
                      {formatMessageDateAgo(lastMessage.createdAt)}
                    </Typography>
                  )}
                  secondary={
                    lastMessage.user.id === user?.id && lastMessage.isRead
                      ? (
                        <DoneAllIcon sx={{ fontSize: '.75em'}} color='primary' />
                      ) : lastMessage.user.id === user?.id && !lastMessage.isRead
                      ? (
                        <CheckIcon sx={{ fontSize: '.75em'}} />
                      ) : lastMessage.user.id !== user?.id && !lastMessage.isRead
                      ? (
                        <CircleIcon sx={{ fontSize: '.75em'}} color='primary' />
                      ) : <CircleIcon sx={{ opacity: 0, fontSize: '.75em' }} />
                  }
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-around',
                    alignItems: 'flex-end',
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

export default function ChatPanel(props: ChatPanelProps) {

  /** Context */

  const { user } = useAuthentication();
  const { chats } = useChatApi();

  /** States */

  const [query, setQuery] = useState<string>('');

  /** Vars */

  const filteredChats = query.length === 0
    ? chats
    : chats.filter((chat) => {
      if (chat.creator.id === user?.id) {
        if (chat.invited.username.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())) {
          return chat;
        } else {
          return null;
        }
      } else {
        if (chat.creator.username.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())) {
          return chat;
        } else {
          return null;
        }
      }
    })

  const sortered = filteredChats.sort((a, b) => {
    const msgA = a.messages;
    const msgB = b.messages;

    if (msgA.length > 0 && msgB.length > 0) {
      const lastA = msgA[msgA.length - 1];
      const lastB = msgB[msgB.length - 1];

      if (new Date(lastA.createdAt) > new Date(lastB.createdAt)) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  })

  return (
    <ChatPanelContainer
      open={props.open}
      variant='persistent'
    >
      <Box
        id="chat__panel"
        sx={{ background: 'rgb(250, 250, 250)' }}
      >
        <ChatPanelHeader
          query={query}
          onChangeQuery={(query: string) => setQuery(query)}
        />
        <ChatPanelList
          chats={sortered}
        />
      </Box>
    </ChatPanelContainer>
  )
}