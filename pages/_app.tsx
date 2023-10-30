import { ThemeRegistry } from '@/components/utils/ThemeRegistry';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
      <ThemeRegistry>
        <Component {...pageProps} />
      </ThemeRegistry>
    </LocalizationProvider>
  );
};

export default App;
