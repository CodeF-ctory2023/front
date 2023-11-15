import { Layout } from '@/components/GestionFinanciera/Layout';
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';

import { useState } from 'react';
import { useRouter } from 'next/router';

const PoliticasDePagoPage = () => {
  const router = useRouter();

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [sumError, setSumError] = useState('');

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue1(e.target.value);
    setError1(''); // Clear any previous error when input changes.
    setSumError(''); // Clear sum error
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2(e.target.value);
    setError2(''); // Clear any previous error when input changes.
    setSumError(''); // Clear sum error
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericValue1 = parseFloat(inputValue1);
    const numericValue2 = parseFloat(inputValue2);

    if (isNaN(numericValue1) || numericValue1 <= 0 || numericValue1 >= 100) {
      setError1(
        'El valor del porcentaje de socio debe ser mayor que 0 y menor que 100.'
      );
      return;
    }

    if (isNaN(numericValue2) || numericValue2 <= 0 || numericValue2 >= 100) {
      setError2(
        'El valor del porcentaje de impuestos debe ser mayor que 0 y menor que 100.'
      );
      return;
    }

    const sum = 100 - (numericValue1 + numericValue2);

    if (sum > 100 || sum < 0) {
      setSumError(
        'El porcentaje de intermediación debe ser mayor que 0 y menor que 100.'
      );
      return;
    } else {
      setInputValue1(''); // Establecer el campo 1 como vacío
      setInputValue2(''); // Establecer el campo 2 como vacío
      return;
    }

    // Resto del código para guardar los valores si todo está correcto
  };

  const resultado =
    100 - (parseFloat(inputValue1) + parseFloat(inputValue2) || 0);

  return (
    <Layout>
      <form onSubmit={handleSubmit} className='text-base flex flex-col'>
        <div className='flex flex-col md:flex-row gap-6 my-4'>
          <div className='flex-1'>
            <Typography variant='h6' gutterBottom>
              Porcentaje Socio (%)
            </Typography>
          </div>
          <div className='flex-2'>
            <TextField
              id='input1'
              value={inputValue1}
              onChange={handleInputChange1}
              type='number'
              label='Porcentaje Socio'
              variant='outlined'
              className='w-full'
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-6 my-4'>
          <div className='flex-1'>
            <Typography variant='h6' gutterBottom>
              Porcentaje Impuestos (%)
            </Typography>
          </div>
          <div className='flex-2'>
            <TextField
              id='input2'
              value={inputValue2}
              onChange={handleInputChange2}
              type='number'
              label='Porcentaje Impuestos'
              variant='outlined'
              className='w-full'
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-6 my-4'>
          <div className='flex-1'>
            <Typography variant='h6' gutterBottom>
              Porcentaje Intermediación (%)
            </Typography>
          </div>
          <div className='flex-2'>
            <TextField
              value={resultado}
              inputProps={{ readOnly: true }}
              label='Porcentaje Intermediación'
              variant='outlined'
              className='w-full'
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          {/* Mostrar mensajes de error */}
          {error1 && <Alert severity='error'>{error1}</Alert>}
          {error2 && <Alert severity='error'>{error2}</Alert>}
          {sumError && <Alert severity='error'>{sumError}</Alert>}
        </div>

        <div style={{ marginTop: '20px' }}>
          <Grid item className='flex justify-evenly gap-2'>
            <Button variant='contained' size='large' type='submit'>
              GUARDAR
            </Button>
            <Button
              variant='contained'
              size='large'
              onClick={() => router.push('/GestionFinanciera/GestionDeCuenta')}
            >
              REGRESAR
            </Button>
          </Grid>
        </div>
      </form>
    </Layout>
  );
};

export default PoliticasDePagoPage;
