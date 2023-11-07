import { useGlobalContext } from '@/context/Global';
import { ReducerActions, Service } from '@/types';

export const ServiceRequest = ({
  serviceId = '',
  locationName,
  destinationName,
}: Service) => {
  const { state, dispatch } = useGlobalContext();
  const { services } = state;

  const addService = (service: Service) => {
    dispatch({ type: ReducerActions.ADD_SERVICE, payload: service });
  };

  const removeService = (id: string) => {
    dispatch({ type: ReducerActions.REMOVE_SERVICE, payload: id });
  };

  const handleAcceptService = (id: string) => {
    const [currentService] = services.filter(
      (service) => service.serviceId === id
    );

    if (!currentService) return;

    if (currentService.serviceId) removeService(currentService.serviceId);
    addService({ ...currentService, activeService: true });
  };

  return (
    <div className='flex flex-col gap-1 bg-orange-300 p-2 rounded-md'>
      <p className='whitespace-nowrap overflow-hidden max-w-full text-ellipsis'>
        <span className='font-bold'>Ubicación Usuario:</span> {locationName}
      </p>
      <p>
        <span className='font-bold'>Ubicación Destino: </span>
        {destinationName}
      </p>
      <button
        className='bg-green-600 py-1 px-2 rounded-md text-sm text-white hover:bg-green-700 transition duration-300 max-w-min self-end'
        onClick={() => handleAcceptService(serviceId)}
      >
        Aceptar
      </button>
    </div>
  );
};
