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
import { NumericFormat } from 'react-number-format';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const recargoValido =
      formData.recargo.length > 0 &&
      parseFloat(formData.recargo) >= 0 &&
      parseFloat(formData.recargo) <= 30;
    const fechasValidas =
      formData.startDate.length > 0 &&
      formData.endDate.length > 0 &&
      new Date(formData.startDate) < new Date(formData.endDate);

    if (!recargoValido || !fechasValidas) {
      setErrors({
        recargo: !recargoValido ? 'Ingrese un valor entre el 0% y 30%' : '',
        fechas: !fechasValidas ? 'Ingrese un rango de fechas válido' : '',
      });

      return;
    }

    // reset errors
    setErrors({
      recargo: '',
      fechas: '',
    });

    //TODO: move to api folder
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
            <NumericFormat
              customInput={TextField}
              required
              label='$/Km'
              id='valorPorKm'
              name='valorPorKm'
              value={formData.valorPorKm}
              variant='filled'
              size='small'
              decimalScale={0}
              thousandSeparator
              onChange={handleChange}
            />
          </Grid>
          <Grid item className='flex justify-between items-baseline gap-4'>
            <Typography variant='body1'>Recargo:</Typography>
            <NumericFormat
              customInput={TextField}
              required
              error={errors.recargo.length > 0}
              helperText={errors.recargo}
              label='%'
              id='recargo'
              name='recargo'
              value={formData.recargo}
              variant='filled'
              size='small'
              onChange={handleChange}
            ></NumericFormat>
          </Grid>
          <Grid item className='flex w-fit flex-nowrap items-baseline gap-4'>
            <Typography variant='body1'>Fechas de vigencia:</Typography>
            <TextField
              required
              value={formData.startDate}
              name='startDate'
              type='date'
              size='small'
              onChange={handleChange}
            ></TextField>
            -
            <TextField
              required
              value={formData.endDate}
              name='endDate'
              type='date'
              size='small'
              onChange={handleChange}
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
