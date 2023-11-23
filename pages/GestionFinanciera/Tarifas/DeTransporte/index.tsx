import { crearTarifaDeTransporte } from '@/api/GestionFinanciera/Tarifas';
import { Layout } from '@/components/GestionFinanciera/Layout';
import { NonStopFee } from '@/interfaces/NonStopFee.interfaces';
import {
  Alert,
  Button,
  Grid,
  Grow,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

const DeTransportePage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    valorPorKm: '',
    recargo: '',
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const [validateErrors, setValidateErrors] = useState({
    recargo: '',
    fechas: '',
  });

  const nonStopFeeMutation = useMutation({
    mutationFn: async () => {
      const req: NonStopFee = {
        price: parseFloat(formData.valorPorKm),
        surcharge: parseFloat(formData.recargo),
        begin_date: formData.startDate.format('YYYY-MM-DD'),
        end_date: formData.endDate.format('YYYY-MM-DD'),
      };

      return await crearTarifaDeTransporte(req);
    },
  });

  const updateFieldValue = (e: {
    target: { name: string; value: unknown };
  }) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validateAndMutate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nonStopFeeMutation.reset();
    const recargoValido =
      formData.recargo.length > 0 &&
      parseFloat(formData.recargo) >= 0 &&
      parseFloat(formData.recargo) <= 30;
    const fechasValidas =
      formData.startDate.isValid() &&
      formData.endDate.isValid() &&
      !formData.startDate.isAfter(formData.endDate);

    if (!recargoValido || !fechasValidas) {
      setValidateErrors({
        recargo: !recargoValido ? 'Ingrese un valor entre el 0% y 30%' : '',
        fechas: !fechasValidas ? 'Ingrese un rango de fechas válido' : '',
      });
      return;
    }

    // reset validation errors
    setValidateErrors({
      recargo: '',
      fechas: '',
    });

    nonStopFeeMutation.mutate();
  };

  return (
    <Layout>
      <Grow in={true}>
        <Paper
          component='form'
          elevation={4}
          className='p-6'
          onSubmit={validateAndMutate}
        >
          <Grid container direction='column' spacing={{ xs: 2, sm: 4 }}>
            <Grid item className='flex justify-center'>
              <Typography variant='subtitle1' fontWeight={600}>
                TARIFAS DE TRANSPORTE SIN PARADA
              </Typography>
            </Grid>
            <Grid item className='flex justify-between items-baseline gap-4'>
              <Typography variant='body1' component='label' htmlFor='valorPorKm'>
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
                onChange={updateFieldValue}
              />
            </Grid>
            <Grid item className='flex justify-between items-baseline gap-4'>
              <Typography variant='body1' component='label' htmlFor='recargo'>
                Recargo:
              </Typography>
              <NumericFormat
                customInput={TextField}
                required
                error={validateErrors.recargo.length > 0}
                helperText={validateErrors.recargo}
                label='%'
                id='recargo'
                name='recargo'
                value={formData.recargo}
                variant='filled'
                size='small'
                onChange={updateFieldValue}
              ></NumericFormat>
            </Grid>

            <Grid
              container
              item
              spacing={{ xs: 1, sm: 2 }}
              sx={{ flexWrap: { sm: 'nowrap' } }}
              justifyContent={{ sm: 'start', xs: 'center' }}
              className='flex items-baseline justify-between gap-2'
            >
              <Grid item>
                <Typography variant='body1' component='legend'>Fechas de vigencia:</Typography>
              </Grid>
              <Grid item className='flex items-center flex-nowrap gap-2'>
                <DatePicker
                  slotProps={{ textField: { variant: 'filled' } }}
                  label='Inicio'
                  value={formData.startDate}
                  className='w-36'
                  onChange={(newValue) =>
                    updateFieldValue({
                      target: { name: 'startDate', value: newValue },
                    })
                  }
                />
                <Typography variant='body1'>-</Typography>
                <DatePicker
                  slotProps={{ textField: { variant: 'filled' } }}
                  label='Fin'
                  value={formData.endDate}
                  className='w-36'
                  onChange={(newValue) =>
                    updateFieldValue({
                      target: { name: 'endDate', value: newValue },
                    })
                  }
                />
              </Grid>
            </Grid>
            {/* Feedback section */}
            <Grid item className='flex justify-center self-stretch'>
              {validateErrors.fechas.length > 0 && (
                <Alert severity='error'>{validateErrors.fechas}</Alert>
              )}
              {nonStopFeeMutation.isError &&
                !nonStopFeeMutation.error.message.includes('no válid') && (
                  <Alert severity='error'>
                    {nonStopFeeMutation.error.message}
                  </Alert>
                )}
              {nonStopFeeMutation.isSuccess && (
                <Alert severity='success'>
                  {nonStopFeeMutation.data?.message ?? 'Guardado exitoso'}
                </Alert>
              )}
              {nonStopFeeMutation.isPending && (
                <LinearProgress className='w-full m-4' />
              )}
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
      </Grow>
    </Layout>
  );
};
export default DeTransportePage;
