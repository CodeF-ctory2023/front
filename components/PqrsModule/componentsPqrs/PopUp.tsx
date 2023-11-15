/* eslint-disable no-restricted-imports */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-default-export */

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PqrsMenu } from './PqrsMenuOptions';
import { OperationsButton } from './OperationsButton';
import { secondaryColor, secondaryColorHover } from '@/components/PqrsModule/constants/colors';
import { usePqrsOptions } from '@/components/PqrsModule/utilities/utils';
import { OptionsButton } from './OptionsButton';


interface PopUpProps {
  isOpen: boolean;
  closePopup: () => void;
}

const   PopUp = ({ isOpen, closePopup }: PopUpProps) => {
  const router = useRouter();
  const { pqrsOptions, claimOptions, complaintOptions } = usePqrsOptions();

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOption, setSelectedOption] = useState<string | null>(null); //Status to control the visibility of options
  const [menuType, setMenuType] = useState<string | null>(null);//Status to control the visibility of menus


  useEffect(() => {
    // Reset menuType when the popup is closed
    if (!isOpen) {
      setMenuType(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleOptionClick = (pqrs: string) => {
    setSelectedOption(pqrs);
    if (pqrs === 'Queja' || pqrs === 'Reclamo') {
      setMenuType(pqrs);
    } else {
      router.push(`/CrearPqrs?tipoPQRS=${pqrs}`);
    }
  };


  return (
    <div
      onClick={handleOverlayClick}
      className='fixed inset-0 flex items-center justify-center z-50 text-gray-700'
    >
      <div
        className='bg-black bg-opacity-70 fixed inset-0'
        onClick={handleOverlayClick}
      ></div>
      <div className='bg-white p-4 rounded-lg shadow-lg z-10 w-60 '>
        <h2 className='title text-center mb-2'>Crear nueva PQRS</h2>
        <h3 className='primary_text text-center mb-2'>Selecciona un tipo de PQRS</h3>
        <div className='space-y-[1%]'>
          {pqrsOptions.map((pqrs) => (
            <OptionsButton text={pqrs.pqrsName} key={pqrs.id} onClick={() => handleOptionClick(pqrs.pqrsName)} />
          ))}
        </div>
        <div className='my-[1rem] text-center'>
          <OperationsButton label='Cerrar' onClick={closePopup} color={secondaryColor} colorHover={secondaryColorHover} />
        </div>
      </div>
      {menuType &&
        <PqrsMenu options={menuType === 'Queja' ? claimOptions : complaintOptions}
          type={menuType}/> // Show complaints menu if showComplaintMenu is true
      }
    </div>
  );
};

export { PopUp };
