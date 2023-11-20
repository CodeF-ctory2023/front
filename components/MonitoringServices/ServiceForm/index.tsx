import { FaLocationArrow } from 'react-icons/fa';
import { BiCurrentLocation, BiSolidCar } from 'react-icons/bi';
import { FaLocationDot } from 'react-icons/fa6';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

import { useServiceForm } from '@/hooks/useServiceForm';
import { FormInput } from '@/components/MonitoringServices/FormInput';
import { useState } from 'react';

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
  const [showForm, setShowForm] = useState(false);

  return (
    <article className='flex flex-col w-full bg-black/[0.7] shadow-md fixed left-0 bottom-0 z-50 text-center sm:w-max sm:p-4 sm:bottom-8 sm:right-8 sm:left-auto sm:rounded-lg'>
      <div className='w-full flex justify-end p-2 sm:hidden'>
        <button
          className='p-1 text-2xl text-white'
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <AiOutlineClose /> : <FiMenu />}
        </button>
      </div>
      <div className={`px-4 pt-0 ${showForm ? 'p-4 h-auto' : 'h-0'} sm:h-auto`}>
        {locationError && (
          <p className='bg-yellow-200 p-1 rounded-lg sm:mb-4'>
            Proporciona tu ubicación antes de solicitar el servicio.
          </p>
        )}
        <div className='flex flex-col gap-4 sm:flex-row'>
          <div>
            <h2 className='text-white mb-2'>Solicitar servicio</h2>

            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className='grid grid-cols-[1fr_28px] items-center gap-2'>
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
              <button
                className='bg-green-600 p-1 rounded-md text-sm text-white hover:bg-green-700 transition duration-300'
                type='submit'
              >
                Solicitar
              </button>
            </form>
          </div>
          <div className='flex flex-col gap-2 border-0 border-t-2 border-t-gray-400 sm:border-l-2 sm:border-l-gray-400 sm:border-t-0 sm:pl-4'>
            <h3 className='text-white mt-4 sm:mt-0'>Ver socios cercanos</h3>
            <label htmlFor='radius' className='text-left text-white text-sm'>
              Radio de búsqueda en metros
            </label>
            <div className='flex items-center gap-1 bg-white pl-1 rounded-md'>
              <BiSolidCar className='text-gray-400 text-sm' />
              <input
                className='bg-white rounded-md p-1 w-full text-sm outline-none'
                type='number'
                placeholder='Radio búsqueda (metros)'
                id='radius'
                value={circleRadius}
                onChange={handleCircleRadius}
              />
            </div>
            <button
              className='bg-black text-white rounded-md py-1 px-3 hover:bg-gray-800 transition duration-300'
              onClick={handleNearbyDrivers}
            >
              Ver/Ocultar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
