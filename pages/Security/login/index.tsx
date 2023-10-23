import { SecurityLayout } from '@/components/Security/layout';
import { useAuth } from '@/hooks/useAuth';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Snackbar,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(auth.isAuthenticated);
  }, [auth.isAuthenticated]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <SecurityLayout>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          variant='filled'
          severity='success'
          sx={{ width: '100%', fontSize: '16px' }}
        >
          Has iniciado sesión como <b>{auth.user.email}</b>
        </Alert>
      </Snackbar>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        maxWidth='100%'
      >
        <Grid
          container
          direction='column'
          display='flex'
          gap={2}
          width='300px'
          maxWidth='100%'
        >
          <Typography
            variant='h4'
            fontWeight='bold'
            marginBottom={3}
            textAlign='center'
          >
            Iniciar Sesión
          </Typography>
          <TextField
            label='Correo electrónico'
            variant='outlined'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label='Contraseña'
            type='password'
            autoComplete='current-password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link href='/Security/register' textAlign='center'>
            ¿No tienes cuenta?
          </Link>
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button
              variant='contained'
              style={{
                backgroundColor: auth.isLoading ? '#abc5df' : '#1976d2',
                width: '100%',
              }}
              disabled={auth.isLoading}
              onClick={() => auth.login({ email, password })}
            >
              Entrar
            </Button>
            {auth.isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </SecurityLayout>
  );
};

export default Login;
