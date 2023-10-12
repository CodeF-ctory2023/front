// pages/nueva-vista.js
import Link from 'next/link';
import { useRouter } from 'next/router';

const CrearPqrs = () => {
  const router = useRouter();
  const { tipoSubPQRS } = router.query;
  const { tipoPQRS } = router.query;

  return (
    <div>
      {/* Haz lo que necesites con el valor de la variable aquí */}

      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-lg'>
          <h1 className='text-2xl font-bold mb-4 text-blue-700  '>
            Formulario PQRS / {tipoPQRS}{' '}
          </h1>
          <p>
            <span className='font-bold'> Usuario:</span> Jaime Ortiz
          </p>
          <p>
            <span className='font-bold'> Fecha:</span> 11/10/2023
          </p>
          <p>
            <span className='font-bold'> Tipo de PQRS:</span> {tipoPQRS}
          </p>
          <p>
            <span className='font-bold'>Tipo de {tipoPQRS} </span>:{' '}
            {tipoSubPQRS}
          </p>
          {/* Campo de texto */}
          <textarea
            className='mt-5 w-full h-32 p-2 border border-gray-300 rounded-md mb-4'
            placeholder='Describe tu Solicitud'
          ></textarea>

          {/* Botón para subir una imagen */}
          <label className='block text-gray-700 mb-4'>
            <span className='mr-2'>Subir una imagen:</span>
            <input type='file' accept='image/*' className='mt-1' />
          </label>

          {/* Botón para subir un archivo */}
          {/* <label className='block text-gray-700 mb-4 '>
            <span className='mr-2'>Subir un archivo:</span>
            <input type='file' className='mt-1' />
          </label> */}
          <div className='mt-5'>
            <Link href={'/'}>
              <button
                className='bg-blue-500 hover:bg-blue-700 
           hover:scale-105 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white focus:outline-none active:scale-95'
              >
                Volver
              </button>
            </Link>
            <button
              className='ml-5 bg-green-500 hover:bg-green-700 
           hover:scale-105 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white focus:outline-none active:scale-95'
            >
              Enviar
            </button>
          </div>

          {/* Botón para volver a la página anterior */}
          {/* <Link href='/'>
            <a className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold'>
              Volver
            </a>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default CrearPqrs;
