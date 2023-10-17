/* eslint-disable no-restricted-imports */
import { pqrsType } from '@/components/PqrsModule/utilities';
import { pqrsInfo } from '@/components/PqrsModule/services/pqrsInfo';
import { useRouter } from 'next/router';
import { IconButton } from './IconButton';
import { primaryColor, secondaryColor, bloodColor } from '@/components/PqrsModule/constants/colors';
import { getStateStyle } from '@/components/PqrsModule/services/getStateStyle';
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
          <IconButton iconName='Delete' colorHover={bloodColor} onClick={() => deletePqrs(pqrs)} />
          <IconButton iconName='EditSquare' colorHover={primaryColor} />
          <IconButton iconName='RemoveRedEye' colorHover={secondaryColor} />
        </div>
      </td>
    </tr>
  );
};

export { PqrsTable };
