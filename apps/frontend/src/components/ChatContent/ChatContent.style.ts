import { Box, styled } from "@mui/material";
import { DRAWER_WIDTH } from "../../common/constants";

export const ChatContentContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open'
})<{
  open: boolean
}>(() => ({
  variants: [
    {
      props: { open: true },
      style: {
        width: `calc(100vw - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
      }
    }
  ],
  marginTop: '65px',
  height: 'calc(100vh - 65px)',
  transition: '.2s width ease-in-out'
}))