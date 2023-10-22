'use client';

import { QueryClientProvider, QueryClient } from 'react-query';
import { Authenticator } from '@/components/Security/Authenticator';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
    },
  },
});

interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator>{children}</Authenticator>
    </QueryClientProvider>
  );
};
