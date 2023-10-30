import { Layout } from '@/components/GestionFinanciera/Layout';
import { NonStopFee } from '@/interfaces/NonStopFee.interfaces';
import {
  Alert,
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import dayjs from 'dayjs';

const DeTransportePage = () => {
  const router = useRouter();
  const [status, setStatus] = useState<{
    type: 'pending' | 'error' | 'success' | undefined;
    description: string;
  }>({
    type: undefined,
    description: '',
  });

  const [formData, setFormData] = useState({
    valorPorKm: '',
    recargo: '',
    startDate: dayjs(),
    endDate: dayjs(),
  });
  const [errors, setErrors] = useState({
    recargo: '',
    fechas: '',
  });

  const handleChange = (e: { target: { name: string; value: unknown } }) => {
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
      formData.startDate.isValid() &&
      formData.endDate.isValid() &&
      !formData.startDate.isAfter(formData.endDate);

    if (!recargoValido || !fechasValidas) {
      setErrors({
        recargo: !recargoValido ? 'Ingrese un valor entre el 0% y 30%' : '',
        fechas: !fechasValidas ? 'Ingrese un rango de fechas válido' : '',
      });

      return;
    }

    setStatus({ type: 'pending', description: '' });

    // reset errors
    setErrors({
      recargo: '',
      fechas: '',
    });

    const req: NonStopFee = {
      price: parseFloat(formData.valorPorKm),
      surcharge: parseFloat(formData.recargo),
      begin_date: formData.startDate.format('YYYY-MM-DD'),
      end_date: formData.endDate.format('YYYY-MM-DD'),
    };

    axios
      .post('http://localhost:8080/ssmu-api/rates/transportation', req)
      .then((res) => {
        if (res.status == 200) {
          setStatus({ type: 'success', description: res.data.message });
        }
        if (res.status == 400) {
          setStatus({ type: 'error', description: res.data.message });
        }
      })
      .catch((err) => {
        if (err.response) {
          setStatus({ type: 'error', description: err.response.data.message });
        } else {
          setStatus({ type: 'error', description: 'Error en el servidor' });
        }
      });
  };

  return (
    <Layout>
      <Paper
        component='form'
        className='p-6'
        elevation={4}
        onSubmit={handleSubmit}
      >
        {/*FIXME: too much width */}
        <Grid container direction='column' spacing={{ xs: 2, sm: 4 }}>
          <Grid item className='flex justify-center '>
            <Typography variant='subtitle1' fontWeight={600}>
              TARIFAS DE TRANSPORTE SIN PARADA
            </Typography>
          </Grid>
          <Grid item className='flex justify-between items-center gap-4'>
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
          <Grid item className='flex justify-between items-center gap-4'>
            <Typography variant='body1' className=''>
              Recargo:
            </Typography>
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
          <Grid
            item
            className='flex w-fit flex-nowrap justify-between items-baseline gap-4'
          >
            <Typography variant='body1'>Fechas de vigencia:</Typography>
            <Box className='flex justify-center items-center w-1/2 gap-2'>
              <DatePicker
                label='Inicio'
                value={formData.startDate}
                className='w-1/2'
                onChange={(newValue) =>
                  handleChange({
                    target: { name: 'startDate', value: newValue },
                  })
                }
              />
              <Typography variant='body1'>-</Typography>
              <DatePicker
                label='Fin'
                value={formData.endDate}
                className='w-1/2'
                onChange={(newValue) =>
                  handleChange({ target: { name: 'endDate', value: newValue } })
                }
              />
            </Box>
          </Grid>
          {/* Feedback section */}
          <Grid item className='flex justify-center self-stretch w-fit'>
            {errors.fechas.length > 0 && (
              <Alert severity='error'>{errors.fechas}</Alert>
            )}
            {(status.type == 'error' || status.type == 'success') && (
              <Alert severity={status.type}>{status.description}</Alert>
            )}
            {status.type == 'pending' && <LinearProgress />}
          </Grid>
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
