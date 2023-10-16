/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useState } from 'react';
import { PopUp } from './PopUp';
import { pqrsInfo } from '../pqrsBd/pqrsInfo';
import { pqrsType } from '.';
import { useRouter } from 'next/router';
import { PqrsTable } from './PqrsTable';

const PqrsCreateComponent = () => {
  const router = useRouter();
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const HEADINGS = ['Tipo de PQRS', 'Fecha', 'Estado', 'Contenido', 'Opciones'];

  return (
    <div className='  min-h-screen flex items-center justify-center'>
      <div className='p-5 h-full bg-gray-100'>
        <h1 className='text-xl mb-2'>Tus PQRS</h1>

        <div className='overflow-auto rounded-lg shadow hidden md:block'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr>
                {HEADINGS.map((key, index) => (
                  <th
                    key={index}
                    className='w-24 p-3 text-sm font-semibold tracking-wide text-left'
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {pqrsInfo.map((pqrs, index) => (
                <PqrsTable key={index} index={index} pqrs={pqrs} />
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-end mt-4'>
          <button
            className='bg-green-500 hover:bg-green-700 
           hover:scale-105 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white focus:outline-none active:scale-95'
            onClick={openPopup}
          >
            Crear
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-700 ml-4
           hover:scale-105 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white focus:outline-none active:scale-95'
          >
            Volver
          </button>
        </div>
      </div>
      <PopUp isOpen={popupOpen} closePopup={closePopup} />
    </div>
  );
};
export { PqrsCreateComponent };
