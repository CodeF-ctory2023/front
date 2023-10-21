/* eslint-disable no-restricted-imports */
import { pqrsType } from '@/components/PqrsModule/utilities';
import { pqrsInfo } from '@/components/PqrsModule/services/pqrsInfo';
import { useRouter } from 'next/router';
import { IconButton } from './IconButton';
import {
  primaryColor,
  secondaryColor,
  bloodColor,
} from '@/components/PqrsModule/constants/colors';
import { getStateStyle } from '@/components/PqrsModule/services/getStateStyle';
import { PopUpView } from './PopUpView';
import { useState } from 'react';
interface PqrsTableProps {
  index: number;
  pqrs: pqrsType;
}

const PqrsTable = ({ index, pqrs }: PqrsTableProps) => {
  const [popUpView, setpopUpView] = useState<boolean>(false);

  const openPopup = () => {
    setpopUpView(true);
  };

  const closePopup = () => {
    setpopUpView(false);
  };

  return (
    <tr key={index} className='bg-white'>
      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
        {pqrs.type}
      </td>
      <td className='text-sm font-medium text-blue-500 hover:underline w-[50%] text-center'>
        {pqrs.createdAt.toDateString()}
      </td>
      <td className='p-3 text-sm text-gray-700 whitespace-nowrap text-center'>
        <span className={`${getStateStyle(pqrs.state)}`}>{pqrs.state}</span>
      </td>
      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
        {pqrs.description}
      </td>
      <td>
        <div className='flex flex-center justify-center'>
          <IconButton
            iconName='fa-solid fa-trash'
            colorHover={bloodColor}
            onClick={() => openPopup()}
          />
          <IconButton iconName='fa-solid fa-pen' colorHover={primaryColor} />
          <IconButton iconName='fa-solid fa-eye' colorHover={secondaryColor} />
        </div>
      </td>
      <PopUpView isOpen={popUpView} closePopup={closePopup} pqrsSend={pqrs} />
    </tr>
  );
};

export { PqrsTable };
