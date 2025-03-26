import React, { useState } from "react";
import { Avatar, ImageList, ImageListItem, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { useAuthentication } from "../../hooks";
import { ChatMessageContainer } from "./ChatMessage.style";
import { ChatMessageProps } from "./ChatMessage.types";
import { formatFileSize, formatMessageTime } from "../../common";

export default function ChatMessage(props: ChatMessageProps) {

  /** Context */

  const { user } = useAuthentication();

  /** States */

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /** Handlers */

  const handleContextOpen = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    
    setAnchorEl(evt.currentTarget);
  }

  const handleContextClose = () => {
    setAnchorEl(null);
  }

  /** Vars */

  const mediaFiles = props.message.uploadedFiles?.filter((file) => file.type.startsWith('image'));
  const docFiles = props.message.uploadedFiles?.filter((file) => !file.type.startsWith('image'));

  return (
    <ChatMessageContainer
      direction={props.direction}
    >
      <Avatar>
        <PersonIcon />
      </Avatar>

      <Stack
        direction='column'
        justifyContent='space-around'
        alignItems={props.direction === 'left' ? 'flex-start' : 'flex-end'}
      >
        {mediaFiles && mediaFiles.length > 0 && (
          <ImageList
            className="chat_message_gallery"
            variant='masonry'
            cols={2}
            gap={3}
            sx={{
              padding: '3px',
              background: 'blue',
              borderRadius: '4px',
            }}
          >
            {mediaFiles.map((file, key) => (
              <ImageListItem key={key}
                sx={{
                  maxWidth: '100px',
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  loading='eager'
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}

        {docFiles && docFiles.length > 0 && (
          <List
            className="chat__message_doc"
          >
            {docFiles.map((file, key) => (
              <ListItem
                key={key}
                disablePadding
                sx={{
                  cursor: 'pointer'
                }}
              >
                <ListItemIcon>
                  <AttachFileIcon />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  secondary={formatFileSize(file.size)}
                />
              </ListItem>
            ))}
          </List>
        )}

        {props.message.text.length > 0 && (
          <Typography
            className="chat__message_text"
            variant='body2'
            onContextMenu={handleContextOpen}
          >
            <span dangerouslySetInnerHTML={{ __html: props.message.text.split(' ').map((str) => str.includes('http') ? `<a href=${str}>${str}</a>` : str).join(' ') }} />
          </Typography>
        )}

        <Typography
          className="chat__message_date"
          variant='caption'
          color='textDisabled'
        >
          {formatMessageTime(props.message.createdAt)}
        </Typography>
      </Stack>

      <Menu
        className="chat__message_context_menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleContextClose}
        sx={{
          '& .MuiList-padding': {
            paddingTop: 0,
            paddingBottom: 0,
            '& .MuiMenuItem-root.MuiButtonBase-root': {
              margin: '4px',
            }
          }
        }}
      >
        {user?.id === props.message.user.id && (
          <MenuItem>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              Edit
            </ListItemText>
          </MenuItem>
        )}
        <MenuItem>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            Copy
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            Delete
          </ListItemText>
        </MenuItem>
      </Menu>
    </ChatMessageContainer>
  )
}