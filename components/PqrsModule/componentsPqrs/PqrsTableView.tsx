/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useEffect, useState } from 'react';
import { PopUp } from './PopUp';
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
import { usePqrs } from '@/hooks/pqrsHooks/usePqrs';
import { pqrsType } from '../utilities';
const PqrsTableView = () => {
  const { getPqrs } = usePqrs();

  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [pqrsInfo, setPqrsInfo] = useState<pqrsType[]>();

  useEffect(() => {
    const getPqrsInfo = async () => {
      const pqrsData = await getPqrs();
      if (pqrsData) {
        setPqrsInfo(pqrsData);
      }
    };
    getPqrsInfo();
  }, []);

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
          <thead className='bg-blue-100 '>
            <tr>
              {HEADINGS.map((key, index) => (
                <th
                  key={index}
                  className=' py-2  text-sm font-semibold tracking-wide text-center'
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {pqrsInfo?.map((pqrs, index) => (
              <PqrsTable
                key={pqrs.id}
                index={index}
                pqrs={pqrs}
                setPqrsInfo={setPqrsInfo}
              />
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
