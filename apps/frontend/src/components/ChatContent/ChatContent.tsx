import { useState } from "react";
import { useChatApi } from "../../hooks";
import MessageForm from "../MessageForm";
import MessageList from "../MessageList";
import { ChatContentContainer } from "./ChatContent.style";
import { ChatContentProps } from "./ChatContent.types";

export default function ChatContent(props: ChatContentProps) {

  /** Context */

  const { selectedChat } = useChatApi();

  /** States */

  const [collapsedList, setCollapseList] = useState<boolean>(false);

  return (
    <ChatContentContainer
      id="chat__content"
      open={props.open}
    >
      {selectedChat ? (
        <>
          <MessageList
            collapsedList={collapsedList}
            messages={selectedChat?.messages || []}
          />
          <MessageForm
            onCollapseList={(state: boolean) => setCollapseList(state)}
          />
        </>
      ) : null}
    </ChatContentContainer>
  )
}