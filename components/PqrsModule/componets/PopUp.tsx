/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-default-export */
import { useRouter } from 'next/router';
import { useState, FC } from 'react';
import { PqrsMenu } from './PqrsMenu';
import { OperationsButton } from './OperationsButton';
import { secondaryColor, secondaryColorHover } from '../constans/colors';
import { getClaimOptions } from '../services/getClaimOptions';
import { getComplaintOptions } from '../services/getComplaintOptions';
import { getPqrsOptions } from '../services/getPqrsOptions';
interface PopUpProps {
  isOpen: boolean;
  closePopup: () => void;
}

const PopUp = ({ isOpen, closePopup }: PopUpProps) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showQuejaMenu, setShowQuejaMenu] = useState<boolean>(false); // Estado para controlar la visibilidad del menú de quejas
  const [showReclamoMenu, setShowReclamoMenu] = useState<boolean>(false); // Estado para controlar la visibilidad del menú de quejas

  const pqrsOptions = getPqrsOptions();
  const claimOptions = getClaimOptions();
  const complaintOptions = getComplaintOptions();
  
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
      if (pqrs === 'Queja') {
        setShowQuejaMenu(true);
      } else {
        setShowQuejaMenu(false);
      }

      if (pqrs === 'Reclamo') {
        setShowReclamoMenu(true);
      } else {
        setShowReclamoMenu(false);
      }
      return;
    }

    router.push(`/CrearPqrs?tipoPQRS=${pqrs}`);

  };

  return (
    <div
      onClick={handleOverlayClick}
      className='fixed inset-0 flex items-center justify-center z-50'
    >
      <div
        className='bg-black bg-opacity-70 fixed inset-0'
        onClick={handleOverlayClick}
      ></div>
      <div className='bg-white p-4 rounded-lg shadow-lg z-10 w-60'>
        <h2 className='text-2xl font-bold mb-2'>TIPO DE PQRS</h2>
        <div className='space-y-0'>
          {pqrsOptions.map((pqrs, index) => (
            <button
              className={`w-full block text-left py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none ${selectedOption === pqrs.pqrsName ? 'bg-blue-500 text-white' : ''
                }`}
              key={index}
              onClick={() => handleOptionClick(pqrs.pqrsName)}
            >
              {pqrs.pqrsName}
            </button>
          ))}
        </div>
        <div className='my-[1rem]'>
          <OperationsButton label='Volver' onClick={closePopup} color={secondaryColor} colorHover={secondaryColorHover} />
        </div>
      </div>

      {showQuejaMenu &&
        selectedOption === 'Queja' && <PqrsMenu options={claimOptions} type={'Queja'} /> // Mostrar el menú de quejas si showQuejaMenu es verdadero
      }

      {showReclamoMenu &&
        selectedOption === 'Reclamo' && <PqrsMenu options={complaintOptions} type={'Reclamo'} /> // Mostrar el menú de reclamos si showQuejaMenu es verdadero
      }
    </div>
  );
};

export { PopUp };
