// pages/nueva-vista.js
import { pqrsType } from '@/components/PqrsModule/utilities';
import { useForm } from '@/hooks/pqrsHooks/useForm';
import { useRouter } from 'next/router';
import { pqrsInfo } from '@/components/PqrsModule/services/pqrsInfo';
import { OperationsButton } from '@/components/PqrsModule/componentsPqrs/OperationsButton';
import { primaryColor, primaryColorHover, secondaryColor, secondaryColorHover } from '@/components/PqrsModule/constants/colors';

const CrearPqrs = () => {

  const router = useRouter();

  const { tipoSubPQRS } = router.query as { tipoSubPQRS: string };
  const { tipoPQRS } = router.query as { tipoPQRS: string };

  const pqrs: pqrsType = {
    id: Math.random(),
    createdBy: 'Jaime Ortiz',
    state: 'Pendiente',
    createdAt: new Date(),
    type: tipoPQRS,
    subType: tipoSubPQRS,
    description: '',
    file: '',
  };



  const returnMenu = () => {
    router.push('/');
  }

  const sendPqrs = () => {
    pqrsInfo.push(values);
    router.push('/');
  };

  const { values, handleInputChange } = useForm(pqrs);
  return (
    <div>


      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-lg'>
          <h1 className='text-2xl font-bold mb-4 text-blue-700  '>
            Formulario PQRS / {tipoPQRS}{' '}
          </h1>
          <p>
            <span className='font-bold'> Usuario:</span> Jaime Ortiz
          </p>
          <p>
            <span className='font-bold'> Fecha:</span>{' '}
            {new Date().toDateString()}
          </p>
          <p>
            <span className='font-bold'> Tipo de PQRS:</span> {tipoPQRS}
          </p>
          {tipoSubPQRS && (
            <p>
              <span className='font-bold'>Tipo de {tipoPQRS} </span>:{' '}
              {tipoSubPQRS}
            </p>
          )}
          {/* Campo de texto */}
          <textarea
            name='description'
            onChange={(e) => handleInputChange(e)}
            className='mt-5 w-full h-32 p-2 border border-gray-300 rounded-md mb-4'
            placeholder='Describe tu Solicitud'
          ></textarea>

          {/* Botón para subir una imagen */}
          <label className='block text-gray-700 mb-4'>
            <span className='mr-2'>Subir una imagen:</span>
            <input type='file' accept='image/*'
              name='file'
              onChange={(e) => handleInputChange(e)}
              className='mt-1' />
          </label>

          <div className='mt-5 space-x-4'>
            <OperationsButton label='Volver' onClick={returnMenu} color={secondaryColor} colorHover={secondaryColorHover} />
            <OperationsButton label='Enviar' onClick={() => sendPqrs()} color={primaryColor} colorHover={primaryColorHover} />
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default CrearPqrs;
