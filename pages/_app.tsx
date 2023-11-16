import { ThemeRegistry } from '@/components/utils/ThemeRegistry';
import '@/styles/globals.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import 'dayjs/locale/es';
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
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
      <ThemeRegistry>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeRegistry>
    </LocalizationProvider>
  );
};

export default App;
