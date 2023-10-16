/* eslint-disable no-restricted-imports */
import { FC } from 'react';
import { pqrsType } from '.';
import { pqrsInfo } from '../pqrsBd/pqrsInfo';
import { useRouter } from 'next/router';
import { IconButton } from './IconButton';
import { primaryColor, secondaryColor, bloodColor } from './Colors';
interface Props {
  index: number;
  pqrs: pqrsType;
}

const PqrsTable: FC<Props> = ({ index, pqrs }) => {
  const router = useRouter();

  const deletePqrs = (pqrs: pqrsType) => {
    //search and delete pqrs
    const index = pqrsInfo.indexOf(pqrs);
    pqrsInfo.splice(index, 1);
    //refresh pqrs list
    router.push('/');
  };

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
  return (
    <tr key={index} className='bg-white'>
      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
        {pqrs.type}
      </td>
      <td className='font-bold text-blue-500 hover:underline'>
        {pqrs.createdAt.toDateString()}
      </td>
      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
        <span className={`${getEstadoStyle(pqrs.state)}`}>{pqrs.state}</span>
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
