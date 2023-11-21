'use client';

import { login, LoginParams, LoginResponse, logout } from '@/api/Security/auth';
import { Alert, Snackbar } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { useRouter } from 'next/router';

const INACTIVITY_SNACKBAR_DURATION = 6000;
const INACTIVITY_WARNING_TIME = 300; // 5 min
const LOGOUT_TIME = 420; // 7 min

type Props = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: {
    name?: string;
    email?: string;
    role?: ('USER' | 'DRIVER' | 'ADMIN')[];
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

  const [inactive, setInactive] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUserData(data.userData);
      setToken(data.token);
    },
  });

  const resetTimer = () => {
    setElapsedTime(0);
    setInactive(false);
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
  });

  useEffect(() => {
    const handleLogout = () => {
      setToken('');
      setUserData({});
      router.push('/Security/login');
      setLoggedOut(true);
      logoutMutation.mutate({ token });
    };

    if (loginMutation.isSuccess) {
      const handleActivity = () => {
        resetTimer();
      };
      const handleTimerTick = () => {
        setElapsedTime((prev) => prev + 1);

        if (elapsedTime === INACTIVITY_WARNING_TIME) {
          //  mensaje de inactividad después de 5 minutos
          setInactive(true);
        } else if (elapsedTime === LOGOUT_TIME) {
          // Cerrar sesión después de 7 minutos (5 minutos de inactividad + 2 minutos adicionales)
          handleLogout();
        }
      };
      // Inicializar el temporizador
      const timer = setInterval(handleTimerTick, 1000);

      // Configurar eventos de inactividad y actividad
      document.addEventListener('mousemove', handleActivity);
      document.addEventListener('keydown', handleActivity);

      // Limpiar el temporizador y los eventos cuando el componente se desmonta
      return () => {
        clearInterval(timer);
        document.removeEventListener('mousemove', handleActivity);
        document.removeEventListener('keydown', handleActivity);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginMutation.isSuccess, elapsedTime]);

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
      <Snackbar
        open={inactive}
        autoHideDuration={INACTIVITY_SNACKBAR_DURATION}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          variant='filled'
          severity='info'
          sx={{ width: '100%', fontSize: '16px' }}
        >
          Has estado inactivo durante 5 minutos. Se cerrará la sesión en 2
          minutos.
        </Alert>
      </Snackbar>
      <Snackbar
        open={loggedOut}
        autoHideDuration={INACTIVITY_SNACKBAR_DURATION}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          variant='filled'
          severity='info'
          sx={{ width: '100%', fontSize: '16px' }}
        >
          Se cerro la sesión.
        </Alert>
      </Snackbar>
      {children}
    </AuthContext.Provider>
  );
};
