import { useGlobalContext } from '@/context/Global';
import { ServiceRequest } from '@/components/MonitoringServices/ServiceRequest';
import { ServiceActive } from '@/components/MonitoringServices/ServiceActive';
import Image from 'next/image';

export const ServiceList = () => {
  const { state } = useGlobalContext();
  const { services } = state;

  return (
    <article className='p-6 bg-blue-300 shadow-md pointer-events-auto fixed left-0 bottom-0 z-50 w-screen sm:w-max sm:left-auto sm:right-8 sm:bottom-8 sm:rounded-lg sm:max-w-lg'>
      <div className='flex flex-col gap-2 items-start'>
        <div className='flex items-center gap-2'>
          <div className='bg-gray-300 w-12 h-12 rounded-full overflow-hidden'>
            <Image
              src='/assets/img/lucas.PNG'
              alt='Foto del conductor'
              width='100'
              height='100'
            />
          </div>
          <div className='text-sm'>
            <h2 className='mb-1 sm:text-base'>
              <span className='font-bold'>Conductor: </span>Lucas
            </h2>
            <p className='sm:text-base'>
              <span className='font-bold'>Vehículo: </span>Renault Sandero -{' '}
              <span className='font-bold'>Placa: </span>000000
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-2 col-span-2 bg-white rounded-lg p-4 text-sm min-w-full max-w-full'>
          <h3 className='font-bold text-base'>Servicios actuales</h3>
          {services.length ? (
            services.map((service) => {
              if (service.activeService) {
                return <ServiceActive key={service.serviceId} {...service} />;
              }
              return <ServiceRequest key={service.serviceId} {...service} />;
            })
          ) : (
            <p className='bg-yellow-200 rounded-md p-1'>
              En este momento no hay servicios disponibles.
            </p>
          )}
        </div>
      </div>
    </article>
  );
};
