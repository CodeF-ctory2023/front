'use client';

import { login, LoginParams, LoginResponse } from '@/api/Security/auth';
import { createContext, useState } from 'react';
import { useMutation, UseMutationResult } from 'react-query';

type Props = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: {
    name?: string;
    email?: string;
    role?: 'user' | 'driver' | 'admin';
  };
  token: string;
  setUserData: (data: object) => void;
  login: UseMutationResult<LoginResponse, unknown, LoginParams, unknown>;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: {},
  token: '',
  setUserData: () => {},
  login: {} as UseMutationResult<LoginResponse, unknown, LoginParams, unknown>,
  isAuthenticated: false,
  isLoading: false,
});

export const Authenticator: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState('');

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUserData(data.userData);
      setToken(data.token);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        setUserData,
        token,
        login: loginMutation,
        isAuthenticated: Object.keys(userData).length > 0,
        isLoading: loginMutation.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
