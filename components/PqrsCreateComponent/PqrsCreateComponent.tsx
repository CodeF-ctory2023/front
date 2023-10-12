/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from './PopUp';
import { useState } from 'react';

const PqrsCreateComponent = () => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const PQRS_INFORMATION = [
    {
      pqrsType: 'Queja',
      createdAt: '10/10/2023',
      pqrsState: 'Proceso',
      createrBy: 'Usuario 001',
      message: 'some text here',
    },
    {
      pqrsType: 'Queja',
      createdAt: '7/10/2022',
      pqrsState: 'Pendiente',
      createdBy: 'Usuario 007',
      message: 'some text here',
    },
    {
      pqrsType: 'Reclamo',
      createdAt: '10/10/2023',
      pqrsState: 'Finalizado',
      createrBy: 'Usuario 001',
      message: 'some text here',
    },
  ];

  const getEstadoStyle = (pqrsState: string) => {
    let color = '';
    let backgroundColor = '';

    switch (pqrsState) {
      case 'Pendiente':
        color = 'text-red-800'; // Cambia a tu color deseado
        backgroundColor = 'bg-red-200'; // Cambia a tu color deseado
        break;
      case 'Proceso':
        color = 'text-yellow-800'; // Cambia a tu color deseado
        backgroundColor = 'bg-yellow-200'; // Cambia a tu color deseado
        break;
      case 'Finalizado':
        color = 'text-green-800'; // Cambia a tu color deseado
        backgroundColor = 'bg-green-200'; // Cambia a tu color deseado
        break;
      default:
        color = 'text-gray-700';
        backgroundColor = 'bg-gray-200';
    }

    return `${color} ${backgroundColor} p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50`;
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
              {PQRS_INFORMATION.map((pqrs, index) => (
                <tr key={index} className='bg-white'>
                  <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                    {pqrs.pqrsType}
                  </td>
                  <td className='font-bold text-blue-500 hover:underline'>
                    {pqrs.createdAt}
                  </td>
                  <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                    <span className={`${getEstadoStyle(pqrs.pqrsState)}`}>
                      {pqrs.pqrsState}
                    </span>
                  </td>
                  <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                    {pqrs.message}
                  </td>
                  <td className='text-center'>
                    <button className='mr-2'>
                      <FontAwesomeIcon icon={faTrashCan} />{' '}
                      {/* Usando el icono de eliminar */}
                    </button>
                    <button className='mr-2'>
                      <FontAwesomeIcon icon={faPenToSquare} />{' '}
                      {/* Usando el icono de editar */}
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faEye} />{' '}
                      {/* Usando el icono de ver */}
                    </button>
                  </td>
                </tr>
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
      <Popup isOpen={popupOpen} closePopup={closePopup} />
    </div>
  );
};
export { PqrsCreateComponent };
