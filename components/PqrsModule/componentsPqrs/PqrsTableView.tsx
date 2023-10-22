/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useState } from 'react';
import { PopUp } from './PopUp';
import { pqrsInfo } from '@/components/PqrsModule/services/pqrsInfo';
import { PqrsTable } from './PqrsTableContent';
import { OperationsButton } from './OperationsButton';
import {
  primaryColor,
  primaryColorHover,
  secondaryColor,
  secondaryColorHover,
} from '@/components/PqrsModule/constants/colors';
import { HEADINGS } from '@/components/PqrsModule/utilities/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PqrsTableView = () => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <section className='flex flex-col w-full '>
      <div className='flex justify-between items-start mb-3'>
        <OperationsButton
          label='Volver'
          color={secondaryColor}
          colorHover={secondaryColorHover}
        />
        <OperationsButton
          label='Añadir PQRS'
          onClick={openPopup}
          color={primaryColor}
          colorHover={primaryColorHover}
        />
      </div>
      <div className='overflow-auto bg-zinc-50 rounded-lg shadow-lg hidden md:block'>
        <table className='w-full '>
          <thead className='bg-blue-50'>
            <tr>
              {HEADINGS.map((key, index) => (
                <th
                  key={index}
                  className=' p-2 text-sm font-semibold tracking-wide text-center'
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {pqrsInfo.map((pqrs, index) => (
              <PqrsTable key={pqrs.id} index={index} pqrs={pqrs} />
            ))}
          </tbody>
        </table>
        <div className='bg-blue-50  h-10'></div>
      </div>

      <PopUp isOpen={popupOpen} closePopup={closePopup} />
      <ToastContainer />
    </section>
  );
};

export { PqrsTableView };
