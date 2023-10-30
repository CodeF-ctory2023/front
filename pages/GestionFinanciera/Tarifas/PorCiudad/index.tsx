import {
  actualizarTarifaPorCiudad,
  obtenerTarifasPorCiudad,
} from '@/api/GestionFinanciera/Tarifas';
import { GrowWrapper } from '@/components/GestionFinanciera/GrowWrapper';
import { Layout } from '@/components/GestionFinanciera/Layout';
import { SkeletonWrapper } from '@/components/GestionFinanciera/SkeletonWrapper';
import {
  CityFeeRequest,
  CityFeeResponse,
} from '@/interfaces/CityFee.interface';
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
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';

const PorCiudadPage = () => {
  const [submitStatus, setSubmitStatus] = useState<
    'pending' | 'success' | 'error' | undefined
  >(undefined);
  const [fetchStatus, setFetchStatus] = useState<
    'success' | 'pending' | 'error' | undefined
  >(undefined);
  const [citiesMap, setCitiesMap] = useState<
    Map<string, { cityId: number; percentage: number }>
  >(new Map());
  const [formData, setFormData] = useState({
    city: '',
    percentage: '',
  });
  const [errors, setErrors] = useState({
    city: '',
    percentage: '',
  });

  const router = useRouter();

  useEffect(() => {
    setSubmitStatus(undefined);
    setFetchStatus('pending');
    setTimeout(() =>
      obtenerTarifasPorCiudad()
        .then((res) => {
          if (res.status == 200) {
            const data: CityFeeResponse = res.data;
            const map = new Map(
              data.map((cityFee) => {
                return [
                  cityFee.name,
                  { cityId: cityFee.id, percentage: cityFee.percentage },
                ];
              })
            );
            setCitiesMap(map);
            setFetchStatus('success');
          }
        })
        .catch((err) => {
          setFetchStatus('error');
          // eslint-disable-next-line no-console
          console.error(err.toJSON());
        })
    );
  }, []);

  useEffect(() => {
    const cityPercentage = citiesMap?.get(formData.city)?.percentage;
    setFormData((prevData) => {
      return {
        ...prevData,
        percentage: cityPercentage?.toString() || '',
      };
    });
  }, [formData.city, citiesMap]);

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
    const validCity = formData.city.length > 0 && citiesMap?.has(formData.city);
    const validPercentage =
      !isNaN(parseFloat(formData.percentage)) &&
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

    setSubmitStatus('pending');

    const requestData: CityFeeRequest = {
      cityId: citiesMap.get(formData.city)?.cityId || NaN,
      percentage: parseFloat(formData.percentage),
    };

    actualizarTarifaPorCiudad(requestData)
      .then((res) => {
        if (res.status == 200) {
          setSubmitStatus('success');
        }
      })
      .catch(() => {
        setSubmitStatus('error');
      });
  };

  return (
    <Layout>
      <Grow in={fetchStatus != undefined}>
        <Paper
          component='form'
          elevation={4}
          className='p-6'
          onSubmit={handleSubmit}
        >
          <Grid container direction='column' spacing={{ sm: 4, xs: 2 }}>
            <Grid item className='flex justify-center'>
              <SkeletonWrapper
                className='w-60'
                loading={fetchStatus == 'pending'}
              >
                <Typography variant='subtitle1'>TARIFAS POR CIUDAD</Typography>
              </SkeletonWrapper>
            </Grid>
            <Grid item className='flex justify-between items-center gap-4'>
              <SkeletonWrapper loading={fetchStatus == 'pending'}>
                <Typography variant='body1' className='whitespace-nowrap'>
                  Elegir ciudad:
                </Typography>
                <Autocomplete
                  id='city'
                  value={formData.city}
                  options={Array.from(citiesMap.keys())}
                  noOptionsText=''
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
                    handleChange({
                      target: { name: 'city', value: newCity },
                    });
                  }}
                />
              </SkeletonWrapper>
            </Grid>
            <Grid item className='flex justify-between items-center gap-8'>
              <SkeletonWrapper loading={fetchStatus == 'pending'}>
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
              </SkeletonWrapper>
            </Grid>
            {/* Alerts section */}
            <Grid item className='flex justify-center self-stretch'>
              {submitStatus == 'success' && (
                <Alert severity={'success'}>Guardado éxitoso</Alert>
              )}
              {submitStatus == 'error' && (
                <Alert severity='error'>No se pudo actualizar la tarifa</Alert>
              )}
              {submitStatus == 'pending' && (
                <LinearProgress className='w-full'></LinearProgress>
              )}
              {fetchStatus == 'error' && (
                <Alert severity='error'>
                  No se puede conectar con el servidor, inténtelo más tarde
                </Alert>
              )}
            </Grid>
            <Grid item className='flex justify-evenly gap-2'>
              {fetchStatus == 'pending' ? (
                  <SkeletonWrapper
                    className='w-full'
                    loading={fetchStatus == 'pending'}
                  ></SkeletonWrapper>
              ) : (
                <GrowWrapper>
                  <Button
                    disabled={
                      fetchStatus == 'error' || submitStatus == 'pending'
                    }
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
