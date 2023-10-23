
import { PqrsMainView } from "@/components/PqrsModule/componentsPqrs/PqrsMainView";
import { Footer } from '@/components/common/footer';


const Home = () => {
  return (
    <section>
      <div>
        <main className='flex h-screen w-full items-center justify-center'>
          <PqrsMainView/>
        </main>
      </div>
      <div className='w-full fixed bottom-0'>
        <Footer />
      </div>
    </section>

  );
}

export default Home;
