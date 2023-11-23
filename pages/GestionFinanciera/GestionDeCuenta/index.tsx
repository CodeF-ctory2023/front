import { Button } from '@mui/material';
import { Layout } from '@/components/GestionFinanciera/Layout';
import { useRouter } from 'next/router';

const GestionDeCuentaPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center py-0 px-4 gap-10' >
      <Button
            variant='contained'
            size='large'
            className='w-full'
            onClick={() => router.push('/GestionFinanciera/GestionDeCuenta/PoliticasDePago')}
          >
            POLITICAS DE PAGO
          </Button>
          <Button
            variant='contained'
            size='large'
            className='w-full'
            onClick={() => router.push('/GestionFinanciera/GestionDeCuenta/EstadoDeCuenta')}
          >
            ESTADO DE CUENTA
          </Button>
          <Button
            variant='contained'
            size='large'
            className='w-full'
            onClick={() => router.push('/GestionFinanciera')}
          >
            REGRESAR
          </Button>
      </div>
    </Layout>
  );
};

export default GestionDeCuentaPage;