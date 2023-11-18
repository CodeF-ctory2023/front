import { Layout } from '@/components/GestionFinanciera/Layout';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';

const GestionFinancieraPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Grid
        container
        width='14rem'
        height='14rem'
        direction='column'
        justifyContent='space-around'
      >
        <Grid item>
          <Button
            variant='contained'
            size='large'
            className='w-full'
            onClick={() => router.push('/GestionFinanciera/Tarifas')}
          >
            TARIFAS
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            size='large'
            className='w-full'
            onClick={() => router.push('/GestionFinanciera/GestionDeCuenta')}
          >
            GESTIÓN DE CUENTA
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default GestionFinancieraPage;
