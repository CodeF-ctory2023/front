import { register } from '@/api/Security/auth';
import { SecurityLayout } from '@/components/Security/layout';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from 'react-query';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passC, setPassC] = useState('');
  const [role, setRole] = useState('USER') as [
    'USER' | 'DRIVER',
    Dispatch<SetStateAction<string>>,
  ];

  const { isLoading, mutate, isSuccess } = useMutation({
    mutationFn: register,
    onSettled: () => {
      setOpen(true);
      setEmail('');
      setPassword('');
      setPassC('');
    },
  });

  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const isValid = email && password && password === passC;

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
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%', fontSize: '16px' }}
        >
          {isSuccess ? (
            <>¡Te has registrado correctamente! Ya puedes iniciar sesión.</>
          ) : (
            <>Ya existe una cuenta con este correo electrónico.</>
          )}
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
            Resgistrarse
          </Typography>
          <ToggleButtonGroup
            color='primary'
            value={role}
            exclusive
            style={{
              justifyContent: 'center',
            }}
            onChange={(e, value) => {
              if (value !== null) {
                setRole(value);
              }
            }}
          >
            <ToggleButton value='USER'>Pasajero</ToggleButton>
            <ToggleButton value='DRIVER'>Conductor</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            label='Correo electrónico'
            type='text'
            autoComplete='email'
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
          <TextField
            label='Confirma tu contraseña'
            type='password'
            required
            value={passC}
            onChange={(e) => setPassC(e.target.value)}
          />
          <Link href='/Security/login' textAlign='center'>
            ¿Ya tienes una cuenta?
          </Link>
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button
              variant='contained'
              style={{
                backgroundColor: isLoading || !isValid ? '#abc5df' : '#1976d2',
                width: '100%',
              }}
              disabled={isLoading || !isValid}
              onClick={() =>
                mutate({
                  email,
                  password,
                  role: [role],
                })
              }
            >
              Crear cuenta
            </Button>
            {isLoading && (
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

export default Register;