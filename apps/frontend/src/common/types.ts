export type UserType = {
  id: number;
  username: string;
  registerAt: Date;
  lastOnlineAt: Date;
  createdChats?: ChatType[];
  invitedChats?: ChatType[];
}

export type ChatType = {
  id: number;
  createdAt: Date;
  messages: MessageType[];
  creator: UserType;
  invited: UserType;
}

export type MessageType = {
  id: number;
  text: string;
  isRead?: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: UserType;
  uploadedFiles?: File[];
}