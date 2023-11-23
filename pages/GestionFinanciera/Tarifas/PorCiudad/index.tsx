'use client';

import {
  actualizarTarifaPorCiudad,
  obtenerTarifasPorCiudad,
} from '@/api/GestionFinanciera/Tarifas';
import { GrowWrapper } from '@/components/GestionFinanciera/GrowWrapper';
import { Layout } from '@/components/GestionFinanciera/Layout';
import { SkeletonWrapper } from '@/components/GestionFinanciera/SkeletonWrapper';
import { CityFeeRequest } from '@/interfaces/CityFee.interface';
import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  Grow,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { NumericFormat } from 'react-number-format';

const PorCiudadPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    city: '',
    percentage: '',
  });

  const [validateErrors, setValidateErrors] = useState({
    percentage: '',
  });

  const cityFeesMutation = useMutation({
    mutationFn: async () => {
      const requestData: CityFeeRequest = {
        cityId: cityFeesMap.data?.get(formData.city)?.cityId || NaN,
        percentage: parseFloat(formData.percentage),
      };

      const res = await actualizarTarifaPorCiudad(requestData);
      return res;
    },
  });

  const validateAndMutate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cityFeesMutation.reset();

    // validate data
    const validCity =
      formData.city.length > 0 && cityFeesMap.data?.has(formData.city);
    const validPercentage =
      !isNaN(parseFloat(formData.percentage)) &&
      Math.abs(parseFloat(formData.percentage)) <= 30;

    if (!validCity) {
      return;
    }
    if (!validPercentage) {
      setValidateErrors({
        percentage: 'Ingrese un valor entre -30% y 30%',
      });
      return;
    }

    // reset validate errors
    setValidateErrors({
      percentage: '',
    });

    cityFeesMutation.mutate();
  };

  const cityFeesMap = useQuery({
    queryKey: ['cityFees'],
    queryFn: async () => {
      const cityFees = await obtenerTarifasPorCiudad();
      const cityFeesMap = new Map(
        cityFees.map((cityFee) => {
          return [
            cityFee.name,
            { cityId: cityFee.id, percentage: cityFee.percentage },
          ];
        })
      );
      return cityFeesMap;
    },
  });

  const updateFieldValue = (e: {
    target: { name: string; value: unknown };
  }) => {
    if (e.target.name == 'city') {
      const cityPercentage = cityFeesMap.data?.get(e.target.value as string)
        ?.percentage;
      updateFieldValue({
        target: { name: 'percentage', value: cityPercentage },
      });
    }
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
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
          <Grid container direction='column' spacing={{ sm: 4, xs: 2 }}>
            <Grid item className='flex justify-center'>
              <SkeletonWrapper className='w-60' loading={cityFeesMap.isLoading}>
                <Typography variant='subtitle1'>TARIFAS POR CIUDAD</Typography>
              </SkeletonWrapper>
            </Grid>
            <Grid item className='flex justify-between items-center gap-4'>
              <SkeletonWrapper loading={cityFeesMap.isLoading}>
                <Typography
                  variant='body1'
                  component='label'
                  htmlFor='city'
                  className='whitespace-nowrap'
                >
                  Elegir ciudad:
                </Typography>
                <Autocomplete
                  id='city'
                  value={formData.city}
                  options={Array.from(
                    cityFeesMap.data ? cityFeesMap.data.keys() : []
                  )}
                  noOptionsText=''
                  isOptionEqualToValue={(option, value) => {
                    if (value === '') {
                      return true;
                    }
                    return option === value;
                  }}
                  size='small'
                  className='w-1/2'
                  renderInput={(params) => (
                    <TextField
                      required
                      name='city'
                      variant='filled'
                      label='Ciudad'
                      sx={{ width: '100' }}
                      {...params}
                    />
                  )}
                  onChange={(_evt, newCity: string | null) => {
                    updateFieldValue({
                      target: { name: 'city', value: newCity },
                    });
                  }}
                />
              </SkeletonWrapper>
            </Grid>
            <Grid item className='flex justify-between items-center gap-8'>
              <SkeletonWrapper loading={cityFeesMap.isLoading}>
                <Typography
                  variant='body1'
                  component='label'
                  htmlFor='percentage'
                  className='whitespace-nowrap'
                >
                  Porcentaje de tarifa:
                </Typography>
                <NumericFormat
                  id='percentage'
                  name='percentage'
                  label='%'
                  value={formData.percentage}
                  required
                  error={validateErrors.percentage.length > 0}
                  helperText={validateErrors.percentage}
                  variant='filled'
                  size='small'
                  className='w-1/2'
                  customInput={TextField}
                  onChange={updateFieldValue}
                />
              </SkeletonWrapper>
            </Grid>
            {/* Alerts section */}
            {(!cityFeesMutation.isIdle || cityFeesMap.isError) && (
              <Grid item className='flex justify-center self-stretch'>
                {cityFeesMutation.isSuccess && (
                  <Alert severity={'success'}>Guardado exitoso</Alert>
                )}
                {cityFeesMutation.isError && (
                  <Alert severity='error'>
                    No se pudo actualizar la tarifa:{' '}
                    {cityFeesMutation.error.message}
                  </Alert>
                )}
                {cityFeesMutation.isPending && (
                  <LinearProgress className='w-full'></LinearProgress>
                )}
                {cityFeesMap.isError && (
                  <Alert severity='error'>
                    No se puede conectar con el servidor, inténtelo más tarde
                  </Alert>
                )}
              </Grid>
            )}
            <Grid item className='flex justify-evenly gap-2'>
              {cityFeesMap.isLoading ? (
                <SkeletonWrapper
                  className='w-full'
                  loading={cityFeesMap.isLoading}
                ></SkeletonWrapper>
              ) : (
                <GrowWrapper>
                  <Button
                    disabled={cityFeesMap.isError || cityFeesMap.isLoading}
                    variant='contained'
                    size='large'
                    type='submit'
                  >
                    GUARDAR
                  </Button>
                  <Button
                    variant='contained'
                    size='large'
                    onClick={() => router.push('/GestionFinanciera/Tarifas')}
                  >
                    REGRESAR
                  </Button>
                </GrowWrapper>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Layout>
  );
};

export default PorCiudadPage;
