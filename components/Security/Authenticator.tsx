'use client';

import { login, LoginParams } from '@/api/Security/auth';
import { createContext, useState } from 'react';
import { useMutation } from 'react-query';

type Props = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: object;
  token: string;
  setUserData: (data: object) => void;
  login: (data: LoginParams) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: {},
  token: '',
  setUserData: () => {},
  login: () => {},
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
        login: loginMutation.mutate,
        isAuthenticated: Object.keys(userData).length > 0,
        isLoading: loginMutation.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
