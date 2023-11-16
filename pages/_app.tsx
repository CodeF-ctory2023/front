import { ThemeRegistry } from '@/components/utils/ThemeRegistry';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3000,
        retry: false,
      },
    },
  });

  return (
    <ThemeRegistry>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeRegistry>
  );
};

export default App;
