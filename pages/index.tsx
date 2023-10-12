import { PqrsCreateComponent } from '@/components/PqrsCreateComponent/PqrsCreateComponent';
import { Footer } from '@/components/common/footer';

const Home = () => {
  return (
    <div>
      <main className='flex h-screen w-full items-center justify-center'>
        <PqrsCreateComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
