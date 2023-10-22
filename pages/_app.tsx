import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from '@/components/common/Providers';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <Component {...pageProps} />;
    </Providers>
  );
};

export default App;
