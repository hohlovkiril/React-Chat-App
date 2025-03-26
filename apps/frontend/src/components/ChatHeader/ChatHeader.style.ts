import { AppBar, styled } from '@mui/material'
import { DRAWER_WIDTH } from '../../common/constants'

export const ChatHeaderContainer = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<{
  open: boolean,
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
  background: 'rgb(250, 250, 250)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(200, 200, 200, .75)',
  transition: '.2s width ease-in-out'
}))