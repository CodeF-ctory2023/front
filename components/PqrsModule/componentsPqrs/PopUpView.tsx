/* eslint-disable no-restricted-imports */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import React, { useEffect } from 'react';

import router from 'next/router';
import { pqrsInfo } from '@/components/PqrsModule/services/pqrsInfo';
import { pqrsType } from '@/components/PqrsModule/utilities';
import {
  bloodColor,
  bloodColorHover,
  secondaryColor,
  secondaryColorHover,
} from '../constants/colors';
import { OperationsButton } from './OperationsButton';

interface PopUpViewProps {
  isOpen: boolean;
  closePopup: () => void;
  pqrsSend: pqrsType;
}

export const PopUpView = ({ isOpen, closePopup, pqrsSend }: PopUpViewProps) => {
  const deletePqrs = (pqrs: pqrsType) => {
    //search and delete pqrs
    const index = pqrsInfo.indexOf(pqrs);
    pqrsInfo.splice(index, 1);
    //refresh pqrs list
    router.push('/');
  };

  if (!isOpen) return null;
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      onClick={handleOverlayClick}
      className='fixed inset-0 flex items-center justify-center z-50 text-gray-700'
    >
      <div
        className='bg-black bg-opacity-50 fixed inset-0'
        onClick={handleOverlayClick}
      ></div>
      <div className='bg-white p-4 rounded-lg shadow-lg z-10 w-96'>
        <div className='justify-center p-6 '>
          <h2 className='text-2xl font-bold mb-4'>
            Seguro que desea eliminar esta PQRS
          </h2>
          <div className='flex justify-center space-x-4 '>
            <OperationsButton
              label='Eliminar'
              onClick={() => {
                deletePqrs(pqrsSend);
                closePopup();
              }}
              color={bloodColor}
              colorHover={bloodColorHover}
            />
            <OperationsButton
              label='Volver'
              onClick={() => {
                closePopup();
              }}
              color={secondaryColor}
              colorHover={secondaryColorHover}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
