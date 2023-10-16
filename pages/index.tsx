import { IconButton } from '@/components/PqrsCreateComponent/IconButton';
import { PqrsCreateComponent } from '@/components/PqrsCreateComponent/PqrsCreateComponent';
import { Footer } from '@/components/common/footer';
import { AiFillDelete} from 'react-icons/ai';
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
