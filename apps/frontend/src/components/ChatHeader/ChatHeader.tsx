import { Avatar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { ChatHeaderProps } from "./ChatHeader.types";
import { ChatHeaderContainer } from "./ChatHeader.style";
import { useAuthentication, useChatApi } from "../../hooks";
import { formatOnlineTime } from "../../common";

export default function ChatHeader(props: ChatHeaderProps) {

  /** Context */

  const { user } = useAuthentication();
  const { selectedChat } = useChatApi();

  /** Handlers */

  const handleOnClick = () => {
    props.onOpen();
  }

  return (
    <ChatHeaderContainer
      open={props.open}
    >
      <Toolbar>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{
            width: '100%',
          }}
        >
          <Stack
            direction='row'
            justifyContent='flex-start'
            gap={1}
          >
            <IconButton
              onClick={handleOnClick}
            >
              {props.open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>

            {selectedChat && (
              <Stack
                direction='row'
                justifyContent='flex-start'
                gap={1}
              >
                <Avatar>
                  <PersonIcon />
                </Avatar>
                <Stack
                  direction='column'
                  justifyContent='space-around'
                >
                  <Typography
                    color='textPrimary'
                    variant='body1'
                  >
                    {selectedChat.creator.id === user?.id
                      ? selectedChat.invited.username
                      : selectedChat.creator.username}
                  </Typography>
                  <Typography
                    variant='caption'
                    color='textDisabled'
                  >
                    {selectedChat.creator.id === user?.id 
                    && formatOnlineTime(selectedChat.invited.lastOnlineAt)}
                    {selectedChat.creator.id !== user?.id 
                      && formatOnlineTime(selectedChat.creator.lastOnlineAt)}
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>

          {selectedChat && (
            <Stack
              direction='row'
              justifyContent='flex-end'
              alignItems='center'
              gap={1}
            >
              <IconButton>
                <CallIcon />
              </IconButton>
              <IconButton>
                <VideoChatIcon />
              </IconButton>
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          )}

        </Stack>
      </Toolbar>
    </ChatHeaderContainer>
  )
}