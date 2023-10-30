import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { SearchBar } from './SearchBar';

export const NavBar = () => {
  return (
    <AppBar component='nav'>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
        }}
      >
        <Box px={'0.5rem'}>
          <Typography variant='h5' fontWeight={600}>
            SSMU
          </Typography>
        </Box>
        <Box width={'40%'} justifyContent={'center'}>
          <SearchBar></SearchBar>
        </Box>
        <Box color={'inherit'} sx={{ display: 'flex', gap: '0.2rem' }}>
          <IconButton color='inherit' size='large'>
            <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
          </IconButton>
          <IconButton color='inherit' size='large'>
            <MenuIcon></MenuIcon>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
