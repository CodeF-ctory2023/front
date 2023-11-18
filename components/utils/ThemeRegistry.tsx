'use client';
import { Box, CircularProgress, useTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';

export const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState(true);

  // workaround for inconsistent style at the very begining of loading the page
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 0);
  }, []);

  const defaultTheme = useTheme();

  return loading ? (
    <Box
      component='div'
      className='flex h-screen w-screen justify-center items-center'
    >
      <CircularProgress></CircularProgress>
    </Box>
  ) : (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={defaultTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
};
