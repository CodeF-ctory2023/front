import { ExampleComponent } from '@/components/ExampleComponent';
import { Footer } from '@/components/common/footer';
import Map from '@/components/map';
import { NavBar } from '@/components/map/NavBar';
import { PrinTab } from '@/components/map/PrinTab';


const Home = () => {
  return (
    
    <div>
       <NavBar/>
    
     
      <main className='flex h-screen w-full items-center justify-center' >
       
      <Map/>
       
      </main>
      <PrinTab/>
      
      <Footer />

    </div>
  );
};

export default Home;
