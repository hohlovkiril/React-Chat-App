import { Box, styled } from "@mui/material";

export const MessageUploadListContainer = styled(Box)(({ theme }) => ({
  padding: '.5em 1em',
  maxHeight: '100px',
  height: '100px',
  overflowX: 'auto',
  borderTop: '1px solid rgba(200, 200, 200, .75)',
  background: theme.palette.mode === 'light'
    ? 'rgb(250, 250, 250)'
    : 'rgb(10, 10, 10)',
  '& .chat__message_form_upload_container': {
    height: '88px',
    width: '64px',
    border: '1px solid rgba(125, 125, 125, .25)',
    borderRadius: '4px',
    position: 'relative',
    '& img': {
      width: '100%',
      height: '100%',
    },
    '& .chat__message_form_upload_remove': {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      left: '100%',
    }
  }
}))

export const MessageFormContainer = styled(Box)(() => ({
  padding: '1em',
  height: '160px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '.75em',
  overflow: 'hidden',
  boxSizing: 'border-box',
  borderTop: '1px solid rgba(200, 200, 200, .75)',
}))