import { useEffect, useState } from 'react';
import { MenuUsers } from '@/components/MonitoringServices/MenuUsers';
import { ServiceForm } from '@/components/MonitoringServices/ServiceForm';
import Map from '@/components/map';
import { useGlobalContext } from '@/context/Global';
import { ServiceInfo } from '@/components/MonitoringServices/ServiceInfo';

const Home = () => {
  const [activeService, setActiveService] = useState<boolean | undefined>(
    false
  );
  const { state } = useGlobalContext();
  const { services } = state;

  useEffect(() => {
    if (!services.length) {
      setActiveService(false);
      return;
    }

    setActiveService(services[0].activeService);
  }, [services]);

  return (
    <div>
      <Map />
      <MenuUsers />
      <ServiceForm />
    </div>
  );
};

export default Home;
