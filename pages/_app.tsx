import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';

const App = ({ Component, pageProps }: AppProps) => {
  return <>
  <Component {...pageProps} />
  <Script src="https://kit.fontawesome.com/114f207fba.js" crossOrigin="anonymous"/>
  </>;
};

export default App;
