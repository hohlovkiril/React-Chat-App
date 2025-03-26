import { Drawer, styled } from "@mui/material";
import { DRAWER_WIDTH } from "../../common/constants";

export const ChatPanelContainer = styled(Drawer)(() => ({
  '& #chat__panel': {
    width: `${DRAWER_WIDTH}px`,
    height: '100%',
    boxSizing: 'border-box',

    '& #chat__panel_header': {
      padding: '18px 18px 8px',
      maxHeight: '115px',
      '& .MuiTypography-root': {
        fontSize: 'clamp(14px, 2vw, 18px)',
        fontWeight: '500',
      },
      '& .MuiChip-root': {
        fontWeight: '600',
      }
    },
    '& #chat__panel_list': {
      padding: '0px 18px',
      height: '100%',
      maxHeight: 'calc(100vh - 115px)',
      overflowY: 'auto',
    }
  }
}))