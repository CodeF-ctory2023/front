import { Button } from '@/components/GestionFinanciera/Button';
import { Layout } from '@/components/GestionFinanciera/Layout';
import { useRouter } from 'next/router';

const base_page = '/GestionFinanciera';

const AdminPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className='flex flex-col justify-center items-center gap-20 h-56'>
        <Button
          text='TARIFAS'
          onClick={() => {
            router.push(`${base_page}/Tarifas`);
          }}
        />
        <Button text='GESTIÓN DE CUENTA'onClick={() => {
            router.push(`${base_page}/GestionDeCuenta`);
          }}
        />
      </div>
    </Layout>
  );
};

export default AdminPage;
