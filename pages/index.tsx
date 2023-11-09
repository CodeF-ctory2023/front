import CustomButton from '@/components/CustomButton';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/signUp');
  };

  return (
    <main className='flex h-screen w-full items-center justify-center'>
      <div className="container font-roboto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl mb-4 font-thin
          ">Conviertete en conductor y abre la puerta a nuevas oportunidades</h1>
          <h2 className="text-xl mb-8 font-thin">
            Comienza el proceso de registro para ser socio conductor junto a nosotros
          </h2>
          <CustomButton text="Registrarse" variant="contained" handleClick={handleClick} className='px-8 py-3 text-base' />
        </div>
      </div>
    </main>
  );
};

export default Home;
