import { ThemeRegistry } from '@/components/utils/ThemeRegistry';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeRegistry>
      <Component {...pageProps} />
    </ThemeRegistry>
  );
};

export default App;
