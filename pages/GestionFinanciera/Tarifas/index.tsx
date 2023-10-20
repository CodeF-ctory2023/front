import { Button } from '@/components/GestionFinanciera/Button';
import { Layout } from '@/components/GestionFinanciera/Layout';
import { useRouter } from 'next/router';

const TarifasPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center py-6 px-4 gap-10'>
        <Button
          text='TARIFAS DE TRANSPORTE SIN PARADA'
          onClick={() => router.push('/GestionFinanciera/Tarifas/DeTransporte')}
        />
        <Button
          text='TARIFAS POR CIUDAD'
          onClick={() => router.push('/GestionFinanciera/Tarifas/PorCiudad')}
        />
        <Button
          text='REGRESAR'
          onClick={() => router.push('/GestionFinanciera')}
        />
      </div>
    </Layout>
  );
};

export default TarifasPage;
