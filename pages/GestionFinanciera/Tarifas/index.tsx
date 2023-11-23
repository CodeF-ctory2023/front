import { Layout } from '@/components/GestionFinanciera/Layout';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const TarifasPage = () => {
  const router = useRouter();

  const routes = [
    '/GestionFinanciera/Tarifas/DeTransporte',
    '/GestionFinanciera/Tarifas/PorCiudad',
    '/GestionFinanciera',
  ];

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center py-6 px-4 gap-10'>
        <Button
          variant='contained'
          size='large'
          className='w-full'
          onClick={() => router.push(routes[0])}
        >
          TARIFAS DE TRANSPORTE SIN PARADA
        </Button>
        <Button
          variant='contained'
          size='large'
          className='w-full'
          onClick={() => router.push(routes[1])}
        >
          TARIFAS POR CIUDAD
        </Button>
        <Button
          variant='contained'
          size='large'
          className='w-full'
          onClick={() => router.push(routes[2])}
        >
          REGRESAR
        </Button>
      </div>
    </Layout>
  );
};

export default TarifasPage;
