import { Layout } from '@/components/GestionFinanciera/Layout';
import {
  Autocomplete,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { NumericFormat } from 'react-number-format';

const cities = ['Medellín', 'Bogotá', 'Cali'];

const PorCiudadPage = () => {
  const [formData, setFormData] = useState({
    city: '',
    percentage: '',
  });
  const [errors, setErrors] = useState({
    city: '',
    percentage: '',
  });

  const router = useRouter();

  const handleChange = (e: { target: { name: string; value: unknown } }) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validCity =
      formData.city.length > 0 && new Set(cities).has(formData.city);
    const validPercentage =
      formData.percentage.length > 0 &&
      Math.abs(parseFloat(formData.percentage)) <= 30;

    if (!validCity || !validPercentage) {
      setErrors({
        city: !validCity ? 'Ciudad no válida' : '',
        percentage: !validPercentage ? 'Ingrese un valor entre -30% y 30%' : '',
      });
      return;
    }
    setErrors({
      city: '',
      percentage: '',
    });

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    });
  };

  return (
    <Layout>
      <Paper
        component='form'
        elevation={4}
        className='p-6'
        onSubmit={handleSubmit}
      >
        <Grid container direction='column' spacing={{ sm: 4, xs: 2 }}>
          <Grid item className='flex justify-center'>
            <Typography variant='subtitle1'>TARIFAS POR CIUDAD</Typography>
          </Grid>
          <Grid item className='flex justify-between items-center gap-4'>
            <Typography variant='body1' className='whitespace-nowrap'>
              Elegir ciudad:
            </Typography>
            <Autocomplete
              id='city'
              value={formData.city}
              options={cities}
              noOptionsText=''
              size='small'
              className='w-1/2'
              renderInput={(params) => (
                <TextField
                  required
                  name='city'
                  variant='filled'
                  label='Ciudad'
                  sx={{ width: '100%' }}
                  {...params}
                />
              )}
              onChange={(_evt, newValue: string | null) => {
                handleChange({
                  target: { name: 'city', value: newValue ? newValue : '' },
                });
              }}
            />
          </Grid>
          <Grid item className='flex justify-between items-baseline gap-4'>
            <Typography variant='body1' className='whitespace-nowrap'>
              Porcentaje de tarifa:
            </Typography>
            <NumericFormat
              id='percentage'
              name='percentage'
              label='%'
              value={formData.percentage}
              required
              error={errors.percentage.length > 0}
              helperText={errors.percentage}
              variant='filled'
              size='small'
              className='w-1/2'
              customInput={TextField}
              onChange={handleChange}
            />
          </Grid>
          <Grid item className='flex justify-evenly gap-2'>
            <Button variant='contained' size='large' type='submit'>
              GUARDAR
            </Button>
            <Button
              variant='contained'
              size='large'
              onClick={() => router.push('/GestionFinanciera/Tarifas')}
            >
              REGRESAR
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default PorCiudadPage;
