/* eslint-disable no-restricted-imports */
import { FC } from 'react';
import { pqrsType } from '..';
import { pqrsInfo } from '../../pqrsBd/pqrsInfo';
import { useRouter } from 'next/router';
import { IconButton } from './IconButton';
import { primaryColor, secondaryColor, bloodColor } from '../constans/colors';
import { getStateStyle } from '../services/getStateStyle';
interface PqrsTableProps {
  index: number;
  pqrs: pqrsType;
}

const PqrsTable = ({ index, pqrs }: PqrsTableProps) => {
  const router = useRouter();

  const deletePqrs = (pqrs: pqrsType) => {
    //search and delete pqrs
    const index = pqrsInfo.indexOf(pqrs);
    pqrsInfo.splice(index, 1);
    //refresh pqrs list
    router.push('/');
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
          <IconButton iconName='Delete' overColor={bloodColor} onClick={() => deletePqrs(pqrs)} />
          <IconButton iconName='EditSquare' overColor={primaryColor} />
          <IconButton iconName='RemoveRedEye' overColor={secondaryColor} />
        </div>
      </td>
    </tr>
  );
};

export { PqrsTable };
