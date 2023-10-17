/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-default-export */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PqrsMenu } from './PqrsMenu';
import { OperationsButton } from './OperationsButton';
import { secondaryColor, secondaryColorHover } from '@/components/PqrsModule/constants/colors';
import { usePqrsOptions } from '@/components/PqrsModule/utilities/utils';
import { OptionsButton } from './OptionsButton';

interface PopUpProps {
  isOpen: boolean;
  closePopup: () => void;
}

const PopUp = ({ isOpen, closePopup }: PopUpProps) => {
  const router = useRouter();
  const { pqrsOptions, claimOptions, complaintOptions } = usePqrsOptions();

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

    // Mostrar el menú de quejas solo si se selecciona 'Queja'
    if (pqrs === 'Queja' || pqrs === 'Reclamo') {
      setMenuType(pqrs);
    } else {
      router.push(`/CrearPqrs?tipoPQRS=${pqrs}`);
      console.log("aja mi apa")
    }
  };
  console.log(router)

  return (
    <div
      onClick={handleOverlayClick}
      className='fixed inset-0 flex items-center justify-center z-50 text-gray-700'
    >
      <div
        className='bg-black bg-opacity-70 fixed inset-0'
        onClick={handleOverlayClick}
      ></div>
      <div className='bg-white p-4 rounded-lg shadow-lg z-10 w-60'>
        <h2 className='text-2xl font-bold mb-2'>TIPO DE PQRS</h2>
        <div className='space-y-0'>
          {pqrsOptions.map((pqrs) => (
            <OptionsButton text={pqrs.pqrsName} key={pqrs.id} onClick={() => handleOptionClick(pqrs.pqrsName)} />
          ))}
        </div>
        <div className='my-[1rem]'>
          <OperationsButton label='Volver' onClick={closePopup} color={secondaryColor} colorHover={secondaryColorHover} />
        </div>
      </div>
      {menuType &&
        <PqrsMenu options={menuType === 'Queja' ? claimOptions : complaintOptions}
          type={menuType} /> // Show complaints menu if showComplaintMenu is true
      }   
    </div>
  );
};

export { PopUp };
