import React, { createContext, useContext, useState } from "react";
import { ChatType, DEMO_CHATS, MessageType } from "../common"
import { useAuthentication } from "./auth.hook";

export type ChatContextApi = {
  chats: ChatType[];
  chatListUpdated: number;

  selectedChat?: ChatType;
  onSelectedChat: (chat?: ChatType) => void;
  onReadMessage: (messageId: number) => void;
  onSendMessage: (message: string, uploads?: File[]) => void;
}

export type ChatProviderProps = {
  children: React.ReactNode;
}

export const ChatContext = createContext<ChatContextApi | undefined>(undefined);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {

  /** Context */

  const { user } = useAuthentication();
  
  /** States */
  
  const [chats, setChats] = useState<ChatType[]>(DEMO_CHATS);
  const [chatListUpdated, setChatListUpdated] = useState<number>(0);
  const [selectedChat, setSelectedChat] = useState<ChatType | undefined>(undefined);

  /** Handlers */

  const handleReadMessage = (messageId: number) => {
    if (!selectedChat) return;

    setChats(prev => prev.map((chat) => ({
      ...chat,
      messages: chat.id !== selectedChat.id
        ? chat.messages
        : selectedChat.messages.map((msg) => ({ ...msg, isRead: msg.id === messageId ? true : msg.isRead }))
    })))
    setSelectedChat({
      ...selectedChat,
      messages: selectedChat.messages.map((msg) => ({ ...msg, isRead: msg.id === messageId ? true : msg.isRead })),
    })
  }

  const handleSendMessage = (message: string, uploads?: File[]) => {
    if (!selectedChat) return;

    if (!user) return;

    const newMessage: MessageType = {
      id: -1,
      text: message,
      user: user,
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      uploadedFiles: uploads,
    }

    setChats(prev => prev.map((chat) => ({
      ...chat,
      messages: chat.id !== selectedChat.id
        ? chat.messages
        : [...chat.messages, newMessage]
    })));
    setSelectedChat({ ...selectedChat, messages: [...selectedChat.messages, newMessage] });
    setChatListUpdated(prev => prev + 1);
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        chatListUpdated,
        selectedChat,
        onSelectedChat: (chat?: ChatType) => setSelectedChat(chat),
        onReadMessage: handleReadMessage,
        onSendMessage: handleSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatApi: () => ChatContextApi = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(`useChatApi must be wrapped in ChatProvider`);
  }

  return context;
}