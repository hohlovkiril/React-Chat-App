import React, { useContext, createContext } from 'react';
import { DEMO_USERS, UserType } from '../common';

export type AuthContextApi = {
  isAuth: boolean;
  user?: UserType;
}

export type AuthProviderProps = {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextApi | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        isAuth: true,
        user: DEMO_USERS['Mark']
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthentication: () => AuthContextApi = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuthentication must be wrapped in AuthProvider`);
  }

  return context;
}