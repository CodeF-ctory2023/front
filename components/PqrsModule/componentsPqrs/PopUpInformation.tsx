/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-imports */

import React from 'react';
import { pqrsType } from '@/components/PqrsModule/utilities';
interface PopUpInformationProps {
  isOpen: boolean;
  closePopup: () => void;
  pqrsSend: pqrsType;
}

export const PopUpInformation = ({
  isOpen,
  closePopup,
  pqrsSend,
}: PopUpInformationProps) => {
  if (!isOpen) return null;
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className='fixed inset-0 flex items-center justify-center z-50 text-gray-700'
    >
      <div
        className='bg-black bg-opacity-50 fixed inset-0'
        onClick={handleOverlayClick}
      ></div>
      <div className='bg-white p-6 rounded-lg shadow-lg z-10 w-96'>
        <div className='text-center'>
          <h2 className='text-3xl font-semibold text-blue-500 mb-2 mr-3'>
            {pqrsSend.type}
          </h2>
        </div>
        <div className='mt-4 flex items-center text-gray-500'>
          <span>Fecha:</span>
          <span className='text-sm ml-2 '>
            {pqrsSend.createdAt.toDateString()}
          </span>
        </div>

        <div className='mt-4 flex items-center text-gray-500'>
          <span className='text-sm mr-2 font-semibold'>Creado por:</span>
          <span className='text-sm '>{pqrsSend.createdBy}</span>
        </div>
        <div className='mt-4 text-gray-500 flex items-center'>
          <span className='text-sm mr-2 font-semibold'>Estado:</span>
          <span>{pqrsSend.state}</span>
        </div>
        {pqrsSend.file && (
          <div className='mt-4 text-gray-500 flex'>
            <span className='text-sm mr-2 font-semibold'>Archivos:</span>
            <a
              href={pqrsSend.file}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:underline cursor-pointer '
            >
              Ver archivo adjunto
            </a>
          </div>
        )}
        <div className='mt-3 text-gray-500  items-center'>
          <h3 className='text-sm mr-2 font-semibold mb-2'>Descripción:</h3>
          <span>{pqrsSend.description}</span>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default PopUpInformation;
