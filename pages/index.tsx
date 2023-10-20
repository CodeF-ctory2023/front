import { ExampleComponent } from '@/components/ExampleComponent';
import { Footer } from '@/components/common/footer';

const Home = () => {
  return (
    <div>
      <main className='flex h-screen w-full items-center justify-center'>
        <ExampleComponent text='Welcome to CodeF@ctory' />
      </main>
      <Footer />
    </div>
  );
};

export default Home;