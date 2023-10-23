import { MenuUsers } from '@/components/MonitoringServices/MenuUsers';
import { ServiceForm } from '@/components/MonitoringServices/ServiceForm';
import Map from '@/components/map';

const Home = () => {
  return (
    <div>
      <Map />
      {/* <MenuUsers /> */}
      <ServiceForm />
    </div>
  );
};

export default Home;
