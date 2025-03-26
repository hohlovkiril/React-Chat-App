import { Box, styled } from "@mui/material";

export const ChatMessageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'direction', 
})<{
  direction: 'left' | 'right',
}>(({ theme }) => ({
  variants: [
    {
      props: { direction: 'left' },
      style: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        '& .chat__message_text': {
          color: 'black',
          background: theme.palette.mode === 'light'
            ? 'rgb(240, 240, 240)'
            : 'rgb(10, 10, 10)',
          '& a': {
            color: 'black',
          }
        },
        '& .chat_message_gallery': {
          background: theme.palette.mode === 'light'
            ? 'rgb(240, 240, 240)'
            : 'rgb(10, 10, 10)',
        },
        '& .chat__message_doc': {
          color: 'black',
          background: theme.palette.mode === 'light'
            ? 'rgb(240, 240, 240)'
            : 'rgb(10, 10, 10)',
        },
      }
    },
    {
      props: { direction: 'right' },
      style: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        '& .chat__message_text': {
          color: 'white',
          background: theme.palette.primary.light,
          '& a': {
            color: 'white',
          }
        },
        '& .chat_message_gallery': {
          background: theme.palette.primary.light ,
        },
        '& .chat__message_doc': {
          background: theme.palette.primary.light,
          '& .MuiListItemIcon-root': {
            color: 'white',
          },
          '& .MuiTypography-root': {
            color: 'white',
          }
        },
      }
    }
  ],

  padding: '1em',
  display: 'flex',
  gap: '1em',
  cursor: 'default',
  '& .chat__message_text': {
    maxWidth: '33vw',
    padding: '6px 12px',
    borderRadius: '4px',
  },
  '& .chat_message_gallery': {
    margin: '0px 0px .25em',
    padding: '3px',
    borderRadius: '4px',
  },
  '& .chat__message_doc': {
    margin: '0px 0px .25em',
    padding: '0px 8px',
    borderRadius: '4px',
    '& .MuiListItemIcon-root': {
      width: '34px',
    },
    '& .MuiListItemText-secondary': {
      fontSize: 'clamp(8px, 2vw, 10px)',
    }
  }
}))