import { MessageListContainer } from "./MessageList.style";
import { MessageListProps } from "./MessageList.types";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useAuthentication, useChatApi } from "../../hooks";
import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

export default function MessageList(props: MessageListProps) {

  /** Context */

  const { user } = useAuthentication();
  const { chatListUpdated, onReadMessage } = useChatApi();

  /** Refs */

  const boxRef = useRef<HTMLElement | null>(null);

  /** Effects */

  useEffect(() => {
    if (props.messages.find((msg) => msg.isRead === false && msg.user.id !== user?.id)) {
      props.messages.forEach((msg) => onReadMessage(msg.id));
    }
  }, [
    user,
    props,
    onReadMessage,
  ])

  useEffect(() => {
    if (chatListUpdated) {
      if (!boxRef.current) return;

      boxRef.current.scrollTo({ top: boxRef.current.scrollHeight })
    }
  }, [
    chatListUpdated,
  ])

  return (
    <MessageListContainer
      id="chat__message_list"
      collapsedList={props.collapsedList}
    >
      <Box
        ref={boxRef}
        sx={{
          // height: '100%',
          overflowY: 'auto',
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'flex-end',
        }}
      >
        {props.messages.map((msg, key) => (
          <ChatMessage
            key={key}
            direction={msg.user.id === user?.id ? 'right' : 'left'}
            message={msg}
          />
        ))}
      </Box>
    </MessageListContainer>
  )
}