/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-default-export */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const tipoSubPQRS = () => {
  const router = useRouter();
  const { tipoSubPQRS } = router.query;
  const { tipoPQRS } = router.query;
};

const Popup = ({ isOpen, closePopup }) => {
  const PQRS_OPTIONS = [
    'Queja',
    'Petición',
    'Reclamo',
    'Sugerencia',
    'Felicitación',
  ];

  const QUEJA_OPTIONS = [
    'Mal comportamiento del conductor',
    'Estado del vehículo',
    'Cobro inadecuado',
    'Conducción peligrosa',
    'Situaciones anómalas con pasajeros',
    'Otro',
  ];

  const RECLAMO_OPTIONS = [
    'Sanciones Injustas',
    'Problemas de Facturación',
    'Otro',
  ];

  if (!isOpen) return null;
  const [selectedOption, setSelectedOption] = useState(null);
  const [showQuejaMenu, setShowQuejaMenu] = useState(false); // Estado para controlar la visibilidad del menú de quejas
  const [showReclamoMenu, setShowReclamoMenu] = useState(false); // Estado para controlar la visibilidad del menú de quejas

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleOptionClick = (pqrs) => {
    setSelectedOption(pqrs);

    // Mostrar el menú de quejas solo si se selecciona 'Queja'
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
          {PQRS_OPTIONS.map((pqrs, index) => (
            <button
              className={`w-full block text-left py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none ${
                selectedOption === pqrs ? 'bg-blue-500 text-white' : ''
              }`}
              key={index}
              onClick={() => handleOptionClick(pqrs)}
            >
              {pqrs}
            </button>
          ))}
        </div>

        <button
          className='ml-0 mt-4 bg-blue-500 hover:bg-blue-700 hover:scale-105 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white focus:outline-none active:scale-95'
          onClick={closePopup}
        >
          Cerrar
        </button>
      </div>

      {showQuejaMenu &&
        selectedOption === 'Queja' && ( // Mostrar el menú de quejas si showQuejaMenu es verdadero
          <div className='bg-white p-4 ml-1 rounded-lg shadow-lg z-10 w-60'>
            <div className='space-y-0'>
              {QUEJA_OPTIONS.map((quejaPqrs, index) => (
                // eslint-disable-next-line react/jsx-key
                <Link
                  href={`/CrearPqrs?tipoSubPQRS=${quejaPqrs}&tipoPQRS=Queja`}
                >
                  <button
                    className='w-full block text-left py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none'
                    key={index}
                  >
                    {quejaPqrs}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}

      {showReclamoMenu &&
        selectedOption === 'Reclamo' && ( // Mostrar el menú de quejas si showQuejaMenu es verdadero
          <div className='bg-white p-4 ml-1 rounded-lg shadow-lg z-10 w-60'>
            <div className='space-y-0'>
              {RECLAMO_OPTIONS.map((reclamoPqrs, index) => (
                // eslint-disable-next-line react/jsx-key
                <Link
                  href={`/CrearPqrs?tipoSubPQRS=${reclamoPqrs}&tipoPQRS=Reclamo`}
                >
                  <button
                    className='w-full block text-left py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none'
                    key={index}
                  >
                    {reclamoPqrs}
                  </button>
                </Link>

                // <button
                //   className='w-full block text-left py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none'
                //   key={index}
                // >
                //   {reclamoPqrs}
                // </button>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default Popup;
