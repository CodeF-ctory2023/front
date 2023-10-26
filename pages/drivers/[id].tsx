import { MenuUsers } from '@/components/MonitoringServices/MenuUsers';
import { ServiceList } from '@/components/MonitoringServices/ServiceList';
import { NextPage } from 'next';
import Map from '@/components/map';

const Driver: NextPage = () => {

  return (
    <>
      <Map />
      <MenuUsers />
      <ServiceList />
    </>
  );
};

export default Driver;
