import { AuthProvider, ChatProvider } from './hooks';
import Chat from "./Chat";
import { ThemeProvider } from '@mui/material';
import { lightTheme } from './common';

export default function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <AuthProvider>
          <ChatProvider>
            <Chat />
          </ChatProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}