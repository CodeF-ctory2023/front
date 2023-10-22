import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import "../components/map/navbar.css"

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
