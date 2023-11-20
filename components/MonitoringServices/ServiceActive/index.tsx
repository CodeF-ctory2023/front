import { Service } from '@/types';

export const ServiceActive = ({ locationName, destinationName }: Service) => {
  return (
    <div className='bg-blue-300 p-2 rounded-md border-l-4 border-l-blue-500'>
      <p className='whitespace-nowrap overflow-hidden max-w-full text-ellipsis'>
        <span className='font-bold'>Ubicación del usuario: </span>
        {locationName}
      </p>
      <p>
        <span className='font-bold'>Ubicación destino: </span> {destinationName}
      </p>
    </div>
  );
};
