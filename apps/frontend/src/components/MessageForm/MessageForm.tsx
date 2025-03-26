import React, { useCallback, useEffect, useState } from "react";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SendIcon from '@mui/icons-material/Send';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

import { MessageFormContainer, MessageUploadListContainer } from "./MessageForm.style";
import { useChatApi } from "../../hooks";
import { MessageFormProps } from "./MessageForm.types";

export default function MessageForm(props: MessageFormProps) {

  /** Context */

  const { selectedChat, onSendMessage } = useChatApi();

  /** States */

  const [message, setMessage] = useState<string>('');
  const [uplaodedFiles, setUploadedFiles] = useState<File[]>([]);

  /** Handlers */

  const handleOnClick = useCallback(() => {
    if (message.length === 0 && uplaodedFiles.length === 0) return;

    setMessage('');
    setUploadedFiles([]);
    onSendMessage(message, uplaodedFiles);
  }, [
    message,
    uplaodedFiles,
    onSendMessage,
  ])

  const handleEnterKey = () => {
    handleOnClick();
  }

  const handlerUploadFiles = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.currentTarget.files;

    if (files) {
      setUploadedFiles(Array.from(files));
    }
  }
  
  /** Effects */

  useEffect(() => {
    if (uplaodedFiles.length > 0) {
      props.onCollapseList(true);
    } else {
      props.onCollapseList(false);
    }
  }, [
    props,
    uplaodedFiles,
  ])

  useEffect(() => {
    if (selectedChat) {
      setMessage('');
      setUploadedFiles([]);
    }
  }, [
    selectedChat,
  ])

  return (
    <>
      {uplaodedFiles.length > 0 && (
        <MessageUploadListContainer>
          <div style={{
            display: 'inline-flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: '1em',
          }}>
          {uplaodedFiles.map((file: File, key) => (
            <Box
              key={key}
              className="chat__message_form_upload_container"
            >
              <IconButton
                className="chat__message_form_upload_remove"
                color='error'
                size='small'
                onClick={() => setUploadedFiles(prev => prev.filter((_, _key) => _key !== key))}
              >
                <CloseIcon sx={{ fontSize: '10px' }} />
              </IconButton>
              {file.type.startsWith('image/') ? (
                <img
                  alt={file.name}
                  src={URL.createObjectURL(file)}
                />
              ) : (
                <>
                  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>
                    <InsertDriveFileOutlinedIcon />
                  </div>
                  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: '75%', left: '50%'}}>
                    <span style={{ fontSize: '8px', }}>{file.name}</span>
                  </div>
                </>
              )}
            </Box>
          ))}
          </div>
        </MessageUploadListContainer>
      )}
      
      <MessageFormContainer
        id="chat__messages_form"
      >
        <TextField
          variant='standard'
          fullWidth
          multiline
          rows={3}
          value={message}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              evt.preventDefault();
              handleEnterKey();
            }
          }}
          onChange={(evt) => setMessage(evt.currentTarget.value)}
        />
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          gap={1}
        >
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            gap={.5}
          >
            <IconButton
              size='small'
              component="label"
            >
              <AttachFileIcon fontSize="small" />
              <input
                accept="application/pdf, .txt, .csv, audio/*, video/*, .docx, .xlsx"
                type='file'
                multiple
                hidden
                onChange={handlerUploadFiles}
              />
            </IconButton>
            <IconButton
              size='small'
              component="label"
            >
              <InsertPhotoIcon fontSize="small" />
              <input
                accept="image/*"
                type='file'
                multiple
                hidden
                onChange={handlerUploadFiles}
              />
            </IconButton>
          </Stack>

          <IconButton
            color='primary'
            onClick={handleOnClick}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </MessageFormContainer>
    </>
  )
}