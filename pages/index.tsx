import CustomButton from '@/components/CustomButton';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handlePartnerClick = () => {
    router.push('/partner');
  };

  const handleManagerClick = () => {
    router.push('/manager');
  };

  return (
    <main className='flex h-screen w-full items-center justify-center bg-gray-100'>
      <div className="container font-roboto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl mb-4 font-semibold">Bienvenido a Nuestra Plataforma</h1>
          <h2 className="text-xl mb-8 font-light">
            Selecciona tu rol para continuar
          </h2>
          <CustomButton text="Socio Conductor" variant="contained" handleClick={handlePartnerClick} className='mb-4 px-8 py-3 text-base' />
          <CustomButton text="Manager" variant="contained" handleClick={handleManagerClick} className='px-8 py-3 text-base' />
        </div>
      </div>
    </main>
  );
};

export default Home;
