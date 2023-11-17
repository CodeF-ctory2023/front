/* eslint-disable no-restricted-imports */

import React, { useState } from 'react';
import { pqrsType } from '@/components/PqrsModule/utilities';
import { StatePqrs } from '@/components/PqrsModule/types/Enum.types';
import { useRouter } from 'next/router';
import { IconButton } from './IconButton';
import {
  primaryColor,
  secondaryColor,
  bloodColor,
} from '@/components/PqrsModule/constants/colors';
import { getStateStyle } from '@/components/PqrsModule/services/getStateStyle';
import { DialogDelete } from './DialogDelete';
import { usePqrs } from '@/hooks/pqrsHooks/usePqrs';

interface PqrsTableProps {
  index: number;
  pqrs: pqrsType;
  setPqrsInfo: (pqrsInfo: pqrsType[]) => void;
}

const PqrsTable = ({ index, pqrs, setPqrsInfo }: PqrsTableProps) => {
  const router = useRouter();
  const { text, backgroundColor, backgroundPoint } = getStateStyle(
    pqrs.estadoPqrs
  );
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const [pqrsState, setPqrsState] = useState<StatePqrs>(pqrs.estadoPqrs);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { deletePqrs, getPqrs, updatePqrsState } = usePqrs();

  const handleDeletePqrs = () => {
    setIsDialogOpen(true);
  };

  const handleEditionMode = () => {
    setEditionMode(!editionMode);
  };

  const setPqrsStateValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPqrsState(event.target.value as StatePqrs);
  };
  const confirmEdition = async () => {
    await updatePqrsState(pqrs.id, pqrsState);
    setEditionMode(!editionMode);
    const pqrsData = await getPqrs();
    if (pqrsData) {
      setPqrsInfo(pqrsData);
    }
  };
  const cancelEdition = () => {
    setEditionMode(!editionMode);
  };

  const handleConfirmDialog = async () => {
    setIsDialogOpen(false);
    await deletePqrs(pqrs.id);
    const pqrsData = await getPqrs();
    if (pqrsData) {
      setPqrsInfo(pqrsData);
    }
    router.push('/');
  };

  const returnMenu = () => {
    router.push('/');
    setIsDialogOpen(false);
  };

  return (
    <tr key={index} className='hover:bg-slate-50 text-center'>
      <td className='py-2 w-[25%] text-sm text-gray-700 text-rigth '>
        {pqrs.descripcionPqrs.slice(0, 25) + '...'}
      </td>
      <td className='  py-2 text-sm flex justify-center whitespace-nowrap '>
        <span className='state  text-gray-700  bg-gray-200'>
          <div className='mr-2 w-2 h-2  bg-gray-800 rounded-full'></div>
          {pqrs.tipoPqrs}
        </span>
      </td>
      <td className='text-sm  font-medium text-blue-500 hover:underline ] '>
        {pqrs.fechaCreacion}
      </td>
      <td
        className={`  flex justify-center  whitespace-nowrap text-center ${
          editionMode ? 'hidden' : ''
        }`}
      >
        <span className={`state ${text} ${backgroundColor}`}>
          <div className={`mr-2 w-2 h-2 ${backgroundPoint} rounded-full`}></div>
          {pqrs.estadoPqrs}
        </span>
      </td>
      <td
        className={`p-3  flex justify-center  whitespace-nowrap text-center ${
          !editionMode ? 'hidden' : ''
        }`}
      >
        <select
          name='pqrsState'
          onChange={(e) => setPqrsStateValue(e)}
          className='w-full bg-white border border-gray-300 hover:border-gray-400 px-3 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
        >
          <option defaultValue={pqrs.estadoPqrs} value={pqrs.estadoPqrs}>
            None
          </option>
          <option value={'Pendiente'}>Pendiente</option>
          <option value={'Proceso'}>Proceso</option>
          <option value={'Finalizado'}>Finalizado</option>
        </select>
      </td>

      <td className={`${editionMode ? 'hidden' : ''}`}>
        <div className='flex justify-center  space-x-2 pr-2'>
          <IconButton
            iconName='fa-solid fa-trash'
            colorHover={bloodColor}
            onClick={handleDeletePqrs}
          />
          <DialogDelete
            isOpen={isDialogOpen}
            back={returnMenu}
            onClose={handleConfirmDialog}
            textContent='Desea eliminar permanentemente este registro.'
            title='Alerta'
          />
          <IconButton
            iconName='fa-regular fa-pen-to-square'
            colorHover={primaryColor}
            onClick={handleEditionMode}
          />
          <IconButton
            iconName='fa-regular fa-eye'
            colorHover={secondaryColor}
          />
        </div>
      </td>
      <td className={`${!editionMode ? 'hidden' : ''}`}>
        <div className='flex flex-center justify-center space-x-4'>
          <IconButton
            iconName='fa-regular fa-circle-check'
            colorHover={primaryColor}
            onClick={confirmEdition}
          />
          <IconButton
            iconName='fa-solid fa-ban'
            colorHover={bloodColor}
            onClick={cancelEdition}
          />
        </div>
      </td>
    </tr>
  );
};

export { PqrsTable };
