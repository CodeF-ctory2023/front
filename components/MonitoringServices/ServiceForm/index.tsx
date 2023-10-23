import { FaLocationArrow } from 'react-icons/fa';
import { BiCurrentLocation, BiSolidCar } from 'react-icons/bi';
import { FaLocationDot } from 'react-icons/fa6';

import { useServiceForm } from '@/hooks/useServiceForm';
import { FormInput } from '@/components/MonitoringServices/FormInput';

const inputIcons = {
  location: <FaLocationArrow className='text-gray-400 text-sm' />,
  destLocation: <FaLocationDot className='text-gray-400 text-sm' />,
};

export const ServiceForm = () => {
  const {
    locationName,
    activeLocation,
    circleRadius,
    locationError,
    handleLocation,
    handleNearbyDrivers,
    handleCircleRadius,
    handleSubmit,
  } = useServiceForm();

  return (
    <article className='flex flex-col gap-4 w-auto bg-black/[0.7] p-4 rounded-lg shadow-md fixed bottom-8 right-8 z-50'>
      {locationError && (
        <p className='bg-yellow-200 p-1 rounded-lg'>
          Proporciona tu ubicación antes de solicitar el servicio.
        </p>
      )}
      <div className='flex gap-4'>
        <div>
          <h2 className='text-white mb-2'>Solicitar servicio</h2>

          <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='flex items-center gap-2'>
              <FormInput
                inputType='text'
                inputValue={locationName}
                inputPlaceholder='Ubicación actual'
                inputDisabled={true}
                inputIcon={inputIcons.location}
              />
              <button
                className='text-xl bg-white p-1 rounded-md text-green-500 hover:text-green-700 transition duration-300'
                type='button'
                title='Mostrar tu ubicación'
                onClick={handleLocation}
              >
                <BiCurrentLocation />
              </button>
            </div>
            {!activeLocation && (
              <p className='text-white text-sm'>
                Este sitio web no tiene permiso para acceder a tu ubicación.
              </p>
            )}
            {/* <div className='flex items-center gap-2'>
            <FormInput
              inputType='text'
              inputValue={destinationName}
              inputPlaceholder='Ubicación destino'
              inputDisabled={false}
              inputIcon={inputIcons.destLocation}
              inputOnChange={handleDestinationLocation}
            />
            <button
              className='bg-black text-white rounded-md py-1 px-3 max-w-min hover:bg-gray-800 transition duration-300'
              onClick={handleSearchLocation}
            >
              Buscar
            </button>
          </div> */}
            <button
              className='bg-green-600 p-1 rounded-md text-sm text-white hover:bg-green-700 transition duration-300'
              type='submit'
            >
              Solicitar
            </button>
          </form>
        </div>
        <div className='flex flex-col gap-2 border-0 border-l-2 border-l-gray-400 pl-4'>
          <h3 className='text-white'>Ver socios cercanos</h3>
          <div className='flex items-center gap-1 bg-white max-w-min pl-1 rounded-md'>
            <BiSolidCar className='text-gray-400 text-sm' />
            <input
              className='bg-white rounded-md p-1 text-sm outline-none'
              type='number'
              placeholder='Radio búsqueda (metros)'
              value={circleRadius}
              onChange={handleCircleRadius}
            />
          </div>
          <button
            className='bg-black text-white rounded-md py-1 px-3 max-w-min hover:bg-gray-800 transition duration-300'
            onClick={handleNearbyDrivers}
          >
            Ver/Ocultar
          </button>
        </div>
      </div>
    </article>
  );
};
