/* eslint-disable no-restricted-imports */

import React from 'react';
import { pqrsType } from '@/components/PqrsModule/utilities';
import { pqrsInfo } from '@/components/PqrsModule/services/pqrsInfo';
import { useRouter } from 'next/router';
import { IconButton } from './IconButton';
import { primaryColor, secondaryColor, bloodColor } from '@/components/PqrsModule/constants/colors';
import { getStateStyle } from '@/components/PqrsModule/services/getStateStyle';
import { DialogDelete } from './DialogDelete';

interface PqrsTableProps {
  index: number;
  pqrs: pqrsType;
}

const PqrsTable = ({ index, pqrs }: PqrsTableProps) => {
  const router = useRouter();
  const { text, backgroundColor, backgroundPoint } = getStateStyle(pqrs.state);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);


  const handleDeletePqrs = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDialog = () => {

    deletePqrs(pqrs);
    setIsDialogOpen(false);
  };

  const deletePqrs = (pqrs: pqrsType) => {
    //search and delete pqrs
    const index = pqrsInfo.indexOf(pqrs);
    pqrsInfo.splice(index, 1);
    //refresh pqrs list
    router.push('/');
  };

  const returnMenu = () => {
    router.push('/');
    setIsDialogOpen(false);
  }

  return (
    <tr key={index} className='hover:bg-slate-50' >
      <td className='p-3 text-sm flex justify-center  whitespace-nowrap '>
        <span className='state  text-gray-700  bg-gray-200'>
          <div className='mr-2 w-2 h-2  bg-gray-800 rounded-full'></div>
          {pqrs.type}
        </span>
      </td>

      <td className='text-sm font-medium text-blue-500 hover:underline ] text-center'>
        {pqrs.createdAt.toDateString()}
      </td>
      <td className='p-3  flex justify-center  whitespace-nowrap text-center '>
        <span className={`state ${text} ${backgroundColor} `}>
          <div className={`mr-2 w-2 h-2 ${backgroundPoint} rounded-full`}></div>
          {pqrs.state}
        </span>
      </td>
      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
        {pqrs.description}
      </td>
      <td>
        <div className='flex flex-center justify-center space-x-4'>
          <IconButton iconName='fa-solid fa-trash' colorHover={bloodColor} onClick={handleDeletePqrs} />
          <DialogDelete isOpen={isDialogOpen} back={returnMenu} onClose={handleConfirmDialog} textContent='Desea eliminar permanentemente este registro.' title='Alerta' />
          <IconButton iconName='fa-regular fa-pen-to-square' colorHover={primaryColor} />
          <IconButton iconName='fa-regular fa-eye' colorHover={secondaryColor} />
        </div>
      </td>
    </tr>
  );
};

export { PqrsTable };
