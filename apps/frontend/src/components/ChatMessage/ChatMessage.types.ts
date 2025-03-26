import { MessageType } from "../../common";

export type ChatMessageProps = {
  direction: 'left' | 'right';
  message: MessageType;
}