import Link from 'next/link';
import React, { FC } from 'react'

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
        {options.map((optionPqrs, index) => (
          // eslint-disable-next-line react/jsx-key
          <Link
            href={`/CrearPqrs?tipoSubPQRS=${optionPqrs}&tipoPQRS=${type}`}
          >
            <button
              className='w-full block text-left py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none'
              key={index}
            >
              {optionPqrs.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}

export { PqrsMenu }
