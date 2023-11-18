import { Layout } from '@/components/GestionFinanciera/Layout';
import {
  Alert,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

const PoliticasDePagoPage = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    associate: '',
    taxes: '',
    platform: '',
  });
  const [validateErrors, setValidateErrors] = useState({
    associate: '',
    taxes: '',
    platform: '',
    sum: '',
  });
  const [submitError, setSubmitError] = useState('');
  const [submitStatus, setSubmitStatus] = useState<
    'not submitted' | 'pending' | 'error' | 'success'
  >('not submitted');

  const updateFieldValue = (e: {
    target: { name: string; value: string | unknown };
  }) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    setValidateErrors({
      associate: '',
      taxes: '',
      platform: '',
      sum: '',
    }); // Clear any previous error when input changes.
  };

  const calculateComplement = (e: {
    target: { name: string; value: string | unknown };
  }) => {
    const names = ['associate', 'taxes', 'platform'];
    const filled = names.filter((name) => {
      const keyName = name as keyof typeof values;
      return values[keyName].length > 0;
    });
    if (filled.length == 3) return; // dont update if all fields are filled
    const othersFilled = filled.filter((name) => name !== e.target.name);
    if (othersFilled.length == 2) {
      const othersValues = othersFilled.map((name) => {
        const keyName = name as keyof typeof values;
        return parseFloat(values[keyName]);
      });
      const complement = Math.fround(
        100 - othersValues.reduce((a, b) => a + b, 0)
      );
      if (complement <= 0 || complement >= 100) return;

      const keyName = e.target.name as keyof typeof values;
      setValues({
        ...values,
        [keyName]: complement.toFixed(2).toString(),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const associateValue = parseFloat(values.associate);
    const taxesValue = parseFloat(values.taxes);
    const platformValue = parseFloat(values.platform);
    const sum = associateValue + taxesValue + platformValue;

    const validAssociate =
      !isNaN(associateValue) && associateValue > 0 && associateValue < 100;
    const validTaxes = !isNaN(taxesValue) && taxesValue > 0 && taxesValue < 100;
    const validPlatform =
      !isNaN(platformValue) && platformValue > 0 && platformValue < 100;
    const validSum = sum == 100;

    if (!validAssociate || !validTaxes || !validPlatform || !validSum) {
      setValidateErrors({
        associate: !validAssociate
          ? 'Ingrese un porcentaje válido (0-100)'
          : '',
        taxes: !validTaxes ? 'Ingrese un porcentaje válido (0-100)' : '',
        platform: !validPlatform ? 'Ingrese un porcentaje válido (0-100)' : '',
        sum: !validSum ? 'La suma de los porcentajes debe ser 100' : '',
      });
      return;
    }

    setValidateErrors({
      associate: '',
      taxes: '',
      platform: '',
      sum: '',
    }); // reset errors
    setSubmitError('');

    setSubmitStatus('pending');
    const fecha = new Date();
    axios
      .post('http://localhost:8080/ssmu-api/policies/create', {
        associate: associateValue,
        taxes: taxesValue,
        platform: platformValue,
        date: fecha.toISOString().split('T')[0], // formato YYYY-MM-DD
      })
      .then((response) => {
        if (response.status == 200) {
          setValues({
            associate: '',
            taxes: '',
            platform: '',
          }); // reset form
          setSubmitStatus('success');
        } else {
          setSubmitStatus('error');
        }
      })
      .catch((error) => {
        if (error.response) {
          setSubmitError(error.response.data.message);
        } else {
          setSubmitError('Error al conectar con el servidor');
        }
        setSubmitStatus('error');
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
        <div className='flex justify-center'>
          <Typography variant='subtitle1' fontWeight={600} gutterBottom>
            ACTUALIZAR POLÍTICA DE PAGO
          </Typography>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-6 my-4'>
          <div className='flex-1'>
            <Typography
              variant='body1'
              component='label'
              htmlFor='associate'
              gutterBottom
            >
              Porcentaje Socio (%)
            </Typography>
          </div>
          <div className='flex-2'>
            <NumericFormat
              customInput={TextField}
              required
              decimalScale={2}
              error={validateErrors.associate.length > 0}
              helperText={validateErrors.associate}
              label='Porcentaje Socio'
              id='associate'
              name='associate'
              value={values.associate}
              variant='outlined'
              className='w-xs max-w-xs'
              onChange={updateFieldValue}
              onFocus={calculateComplement}
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-6 my-4'>
          <div className='flex-1'>
            <Typography
              variant='body1'
              component='label'
              htmlFor='taxes'
              gutterBottom
            >
              Porcentaje Impuestos (%)
            </Typography>
          </div>
          <div className='flex-2'>
            <NumericFormat
              customInput={TextField}
              required
              decimalScale={2}
              error={validateErrors.taxes.length > 0}
              helperText={validateErrors.taxes}
              label='Porcentaje Impuestos'
              id='taxes'
              name='taxes'
              value={values.taxes}
              variant='outlined'
              className='w-xs max-w-xs'
              onChange={updateFieldValue}
              onFocus={calculateComplement}
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-6 my-4'>
          <div className='flex-1'>
            <Typography
              variant='body1'
              component='label'
              htmlFor='platform'
              gutterBottom
            >
              Porcentaje Intermediación (%)
            </Typography>
          </div>
          <div className='flex-2'>
            <NumericFormat
              customInput={TextField}
              required
              decimalScale={2}
              error={validateErrors.platform.length > 0}
              helperText={validateErrors.platform}
              label='Porcentaje Intermediación'
              id='platform'
              name='platform'
              value={values.platform}
              variant='outlined'
              className='w-xs max-w-xs'
              onChange={updateFieldValue}
              onFocus={calculateComplement}
            />
          </div>
        </div>

        <div className='w-full px-4 justify-center'>
          {validateErrors.sum.length > 0 && (
            <Alert severity='error'>{validateErrors.sum}</Alert>
          )}
          {submitStatus === 'pending' && <LinearProgress className='m-4' />}
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
      </Paper>

      <Snackbar
        open={submitStatus === 'success' || submitStatus === 'error'}
        autoHideDuration={5000}
        onClose={() => {
          setSubmitStatus('not submitted');
          setTimeout(() => {
            setSubmitError('');
          }, 100);
        }}
      >
        {submitStatus === 'success' ? (
          <Alert severity='success'>
            Política de pago registrada exitosamente.
          </Alert>
        ) : (
          <Alert severity='error'>{submitError}</Alert>
        )}
      </Snackbar>
    </Layout>
  );
};

export default PoliticasDePagoPage;
