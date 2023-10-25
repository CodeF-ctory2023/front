import { AuthContext } from '@/components/Security/Authenticator';
import { useContext } from 'react';

export const useAuth = () => {
  return useContext(AuthContext);
};
