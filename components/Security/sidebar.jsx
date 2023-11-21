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
import { useAuth } from '@/hooks/Security/useAuth';

const drawerWidth = 240;

export const Sidebar = () => {
  const router = useRouter();

  const auth = useAuth();

  const user = auth.isAuthenticated ? auth.user.role[0] : 'none';

  const lista_users = {
    none: ['Iniciar Sesion', 'Registrarse'],
    USER: ['Inicio', 'Configuración', 'Gestionar Perfil', 'Cerrar Sesión'],
    DRIVER: ['Inicio', 'Configuración', 'Gestionar Perfil', 'Cerrar Sesión'],
    ADMIN: [
      'Inicio',
      'Configuración',
      'Gestionar Perfil',
      'Cerrar Sesión',
      'Gestionar Usuarios',
      'Gestionar Roles',
    ],
  };

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
          {user &&
            lista_users[user].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                onClick={() => {
                  if (index === 0) {
                    router.push(`/Security/${user}/inicio`);
                  } else if (index === 1) {
                    router.push(`/Security/${user}/configuracion`);
                  } else if (index === 2) {
                    router.push(`/Security/${user}/perfil`);
                  } else if (index === 3) {
                    router.push(`/Security/login`);
                  } else if (index === 4) {
                    router.push(`/Security/${user}/usuarios`);
                  } else if (index === 5) {
                    router.push(`/Security/${user}/roles`);
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
