import React, { useState } from 'react'
import { OptionsButton } from './OptionsButton';
import { OperationsButton } from './OperationsButton';
import { DialogMessage } from './DialogAlert';
import { secondaryColor, secondaryColorHover } from '@/components/PqrsModule/constants/colors';
import { useRouter } from 'next/router';

interface PqrsMenuProps {
  options: {
    id: number,
    name: string,
  }[],

  type: string;

}



const PqrsMenu = ({ options, type }: PqrsMenuProps) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<null | string>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);


  const handleRedirect = () => {
    if (selectedOption === null) {
      setIsDialogOpen(true);
    } else {
      router.push(`/CrearPqrs?tipoSubPQRS=${selectedOption}&tipoPQRS=${type}`);
    }
  };

  const handleConfirmDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className='bg-white p-4 ml-1 rounded-lg shadow-lg z-10 w-60'>
      <div className='space-y-[1%]'>
        <h3 className='primary_text text-center mb-2'>Selecciona una opción</h3>
        {options.map((optionPqrs) => (
          <OptionsButton text={optionPqrs.name} key={optionPqrs.id} onClick={() => setSelectedOption(optionPqrs.name)} />
          // eslint-disable-next-line react/jsx-key
        ))}

      </div>
      <div className='mt-5 text-right'>
        <OperationsButton label='Continuar' onClick={handleRedirect} color={secondaryColor} colorHover={secondaryColorHover} />
      </div>

      <DialogMessage isOpen={isDialogOpen} onClose={handleConfirmDialog} textContent='No ha seleccionado ninguna opción, por favor seleccione una para continuar.' title='Alerta' />

    </div>
  )
}

export { PqrsMenu }
