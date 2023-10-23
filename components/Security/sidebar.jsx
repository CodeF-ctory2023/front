'use client';

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

export const Sidebar = () => {
  const router = useRouter();

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {['Iniciar Sesión', 'Registrarse'].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => {
                if (index === 0) {
                  router.push('/Security/login');
                } else {
                  router.push('/Security/register');
                }
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? <LoginIcon /> : <HowToRegIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
