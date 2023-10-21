import { Button } from '@/components/GestionFinanciera/Button';
import { Layout } from '@/components/GestionFinanciera/Layout';
import { useRouter } from 'next/router';

const GestionDeCuentaPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center py-0 px-4 gap-10' >
        <Button
          text='POLITICAS DE PAGO A LOS SOCIOS'
          onClick={() => router.push('/GestionFinanciera/GestionDeCuenta/PoliticasDePago')}
        />
        <Button
          text='ESTADO DE CUENTA'
          onClick={() => router.push('/GestionFinanciera/GestionDeCuenta/EstadoDeCuenta')}
        />
        <Button
          text='REGRESAR'
          onClick={() => router.push('/GestionFinanciera')}
        />
      </div>
    </Layout>
  );
};

export default GestionDeCuentaPage;