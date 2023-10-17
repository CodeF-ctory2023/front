import React from 'react'
import { OptionsButton} from './OptionsButton';

interface PqrsMenuProps {
  options: {
    id: number,
    name: string,
  }[],

  type: string;

}



const PqrsMenu = ({ options, type }: PqrsMenuProps) => {
  return (
    <div className='bg-white p-4 ml-1 rounded-lg shadow-lg z-10 w-60'>
      <div className='space-y-0'>
        {options.map((optionPqrs) => (
          <OptionsButton text ={optionPqrs.name} key={optionPqrs.id} href={`/CrearPqrs?tipoSubPQRS=${optionPqrs.name}&tipoPQRS=${type}`}/>
          // eslint-disable-next-line react/jsx-key
        ))}
      </div>
    </div>
  )
}

export { PqrsMenu }
