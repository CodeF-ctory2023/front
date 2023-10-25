import { Navbar } from '@/components/Security/navbar';
import { Sidebar } from '@/components/Security/sidebar';
import { Box, CssBaseline } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const SecurityLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: '100px' }}>
        {children}
      </Box>
    </Box>
  );
};
