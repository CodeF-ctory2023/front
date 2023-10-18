import { ExampleComponent } from '@/components/ExampleComponent';
import { Footer } from '@/components/common/footer';
import Map from '@/components/map';

const Home = () => {
  return (
    <div>
      <main className='flex h-screen w-full items-center justify-center'>
        <Map/>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
