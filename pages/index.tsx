import { MenuUsers } from '@/components/MonitoringServices/MenuUsers';
import { ServiceForm } from '@/components/MonitoringServices/ServiceForm';
import Map from '@/components/map';


const Home = () => {
  return (
    <div>
      <Map />
      <MenuUsers />
      <ServiceForm />
      {/* <main className='flex h-screen w-full items-center justify-center'>
        {/* <ExampleComponent text='Welcome to CodeF@ctory' /> */}
      {/* </main> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
