import { ChatType, UserType } from "./types";

export const DRAWER_WIDTH = 280;

export const DEMO_USERS: Record<string, UserType> = {
  'Mark': {
    id: 1,
    username: 'Mark',
    registerAt: new Date(),
    lastOnlineAt: new Date(),
  },
  'David': {
    id: 2,
    username: 'David',
    registerAt: new Date(),
    lastOnlineAt: new Date('03.25.2025 21:30'),
  },
  'John': {
    id: 3,
    username: 'John',
    registerAt: new Date(),
    lastOnlineAt: new Date('03.25.2025 22:30'),
  },
  'Alen': {
    id: 4,
    username: 'Alen',
    registerAt: new Date(),
    lastOnlineAt: new Date('03.25.2025 22:30'),
  },
  'Herman': {
    id: 5,
    username: 'Herman',
    registerAt: new Date(),
    lastOnlineAt: new Date('03.25.2025 22:30'),
  },
  'Kate': {
    id: 6,
    username: 'Kate',
    registerAt: new Date(),
    lastOnlineAt: new Date('03.25.2025 22:30'),
  },
  'Midas': {
    id: 7,
    username: 'Midas',
    registerAt: new Date(),
    lastOnlineAt: new Date('03.25.2025 22:30'),
  },
  'Petter': {
    id: 8,
    username: 'Petter',
    registerAt: new Date(),
    lastOnlineAt: new Date('03.25.2025 22:30'),
  },
  'Adaline': {
    id: 9,
    username: 'Adaline',
    registerAt: new Date(),
    lastOnlineAt: new Date('03.25.2025 22:30'),
  },
  'Alex': {
    id: 10,
    username: 'Alex',
    registerAt: new Date(),
    lastOnlineAt: new Date('03.25.2025 22:30'),
  },
  'Aurora': {
    id: 11,
    username: 'Aurora',
    registerAt: new Date(),
    lastOnlineAt: new Date('03.25.2025 22:30'),
  },
  'Victoria': {
    id: 12,
    username: 'Victoria',
    registerAt: new Date(),
    lastOnlineAt: new Date('03.25.2025 22:30'),
  },
}

export const DEMO_CHATS: ChatType[] = Object.keys(DEMO_USERS).slice(1).map((user, key) => ({
  id: key + 1,
  createdAt: new Date(`03.26.2025 00:${key >= 9 ? key : `0${key}`}`),
  creator: DEMO_USERS['Mark'],
  invited: DEMO_USERS[user],
  messages: [
    {
      id: 1,
      text: 'Hello',
      isRead: false,
      createdAt: new Date(`03.26.2025 00:${key >= 9 ? key : `0${key}`}`),
      updatedAt: new Date('03.24.2025 19:24'),
      user: DEMO_USERS['Mark']
    }
  ] 
}))