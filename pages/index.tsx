import { IconButton } from '@/components/PqrsModule/componets/IconButton';
import { PqrsCreateComponent } from '@/components/PqrsModule/componets/PqrsCreateComponent';
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
