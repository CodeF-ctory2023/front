import { Layout } from '@/components/GestionFinanciera/Layout';
import {
  Alert,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const DeTransportePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    valorPorKm: '',
    recargo: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState({
    recargo: '',
    fechas: '',
  });

  const testPatternAndUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputType: 'default' | 'int' | 'float'
  ) => {
    const regexDict = {
      default: /./,
      int: /^[0-9\b]+$/,
      float: /^[0-9\b]*(\.)?[0-9\b]*$/,
    };
    const [name, value] = [e.target.name, e.target.value];
    if (value === '' || regexDict[inputType].test(value)) {
      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: value,
        };
      });
    }
  };
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const recargoValido =
      formData.recargo.length > 0 && parseFloat(formData.recargo) <= 30;
    const fechasValidas =
      formData.startDate.length > 0 &&
      formData.endDate.length > 0 &&
      new Date(formData.startDate) < new Date(formData.endDate);

    if (!recargoValido || !fechasValidas) {
      setErrors({
        recargo: !recargoValido ? 'Ingrese un valor no mayor al 30%' : '',
        fechas: !fechasValidas ? 'Ingrese un rango de fechas válido' : '',
      });

      return;
    }

    // reset errors
    setErrors({
      recargo: '',
      fechas: '',
    });

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        valorKm: formData.valorPorKm,
        recargo: formData.recargo,
        fechaInicio: formData.startDate,
        fechaFin: formData.endDate,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          router.reload();
          return response.json();
        }
      })
      // eslint-disable-next-line no-console
      .then((json) => console.log(json));
  };

  return (
    <Layout>
      <Paper
        component='form'
        className='w-fit p-6'
        elevation={4}
        onSubmit={handleSubmit}
      >
        <Grid container direction='column' spacing={{ xs: 2, sm: 4 }}>
          <Grid item className='flex justify-center'>
            <Typography variant='subtitle1' fontWeight={600}>
              TARIFAS DE TRANSPORTE SIN PARADA
            </Typography>
          </Grid>
          <Grid item className='flex justify-between items-baseline gap-4'>
            <Typography variant='body1'>
              Valor por kilómetro cubierto:
            </Typography>
            <TextField
              required
              id='valorPorKm'
              name='valorPorKm'
              value={formData.valorPorKm}
              variant='filled'
              size='small'
              label='$/Km'
              onChange={(e) => testPatternAndUpdate(e, 'int')}
            ></TextField>
          </Grid>
          <Grid item className='flex justify-between items-baseline gap-4'>
            <Typography variant='body1'>Recargo:</Typography>
            <TextField
              required
              error={errors.recargo.length > 0}
              helperText={errors.recargo}
              id='recargo'
              name='recargo'
              value={formData.recargo}
              variant='filled'
              size='small'
              label='%'
              className=''
              onChange={(e) => testPatternAndUpdate(e, 'float')}
            ></TextField>
          </Grid>
          <Grid item className='flex w-fit flex-nowrap items-baseline gap-4'>
            <Typography variant='body1'>Fechas de vigencia:</Typography>
            <TextField
              required
              value={formData.startDate}
              name='startDate'
              type='date'
              size='small'
              onChange={(e) => testPatternAndUpdate(e, 'default')}
            ></TextField>
            -
            <TextField
              required
              value={formData.endDate}
              name='endDate'
              type='date'
              size='small'
              onChange={(e) => testPatternAndUpdate(e, 'default')}
            ></TextField>
          </Grid>
          {errors.fechas.length > 0 && (
            <Grid item>
              <Alert severity='error'>{errors.fechas}</Alert>
            </Grid>
          )}
          <Grid item className='flex justify-evenly'>
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
export default DeTransportePage;
