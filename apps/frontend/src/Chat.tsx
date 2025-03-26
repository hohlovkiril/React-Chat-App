import { useEffect, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatPanel from "./components/ChatPanel";
import ChatContent from "./components/ChatContent";
import { useChatApi } from "./hooks";

export default function Chat() {

  /** Context */
  
  const { selectedChat, onSelectedChat } = useChatApi();

  /** States */
  
  const [open, setOpen] = useState<boolean>(true);

  /** Effects */

  useEffect(() => {
    if (!selectedChat) {
      setOpen(true);
    }
  }, [
    selectedChat,
  ]);

  useEffect(() => {
    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        onSelectedChat();
      }
    })
  }, [
    onSelectedChat,
  ])

  return (
    <>
      <ChatHeader
        open={open}
        onOpen={() => setOpen(!open)}
      />
      
      <ChatPanel
        open={open}
      />

      <ChatContent
        open={open}
      />
    </>
  )
}