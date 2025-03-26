import { Stack, styled } from "@mui/material";

export const MessageListContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'collapsedList'
})<{
  collapsedList: boolean;
}>(({ collapsedList }) => ({
  height: '100%',
  maxHeight: `calc(100vh - 65px - ${collapsedList ? '290px' : '160px'} - 1px)`,
  background: 'white',
  overflowY: 'auto',
  justifyContent: 'flex-end',
  transition: '.2s width ease-in-out'
}))