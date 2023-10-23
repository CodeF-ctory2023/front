// pages/nueva-vista.js
import { pqrsType } from '@/components/PqrsModule/utilities';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { pqrsInfo } from '@/components/PqrsModule/services/pqrsInfo';
import { OperationsButton } from '@/components/PqrsModule/componentsPqrs/OperationsButton';
import { primaryColor, primaryColorHover, secondaryColor, secondaryColorHover } from '@/components/PqrsModule/constants/colors';
import { useRef, useState } from 'react';


const CrearPqrs = () => {
  const router = useRouter();

  const { tipoSubPQRS } = router.query as { tipoSubPQRS: string };
  const { tipoPQRS } = router.query as { tipoPQRS: string };

  const [files, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);


  const [pqrs, setPqrs] = useState<pqrsType>({
    id: Math.floor(Math.random() * 1000000),
    createdBy: 'Jaime Ortiz',
    state: 'Pendiente',
    createdAt: new Date(),
    type: tipoPQRS,
    subType: tipoSubPQRS,
    description: '',
    file: '',
  });

  const { register, handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {

    const fileUrl = files ? URL.createObjectURL(files) : undefined;
    const updatedPqrs = {
      ...pqrs,
      description: data.description,
      file: fileUrl
    };

    // Ahora `updatedPqrs` contiene el estado más reciente
    pqrsInfo.push(updatedPqrs);
    setPqrs(updatedPqrs);
    router.push('/');

  })


  const returnMenu = () => {
    router.push('/');
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <section className='flex flex-col items-center justify-center h-screen bg-slate-100'>


      <div className='title mb-3  flex justify-start '>
        <span>Formulario PQRS / {tipoPQRS}{' '}</span>
      </div>


      <section className=' flex flex-row w-[70%] h-[60%]  bg-white p-8 rounded-lg shadow-lg'>

        <div className='w-auto space-y-4 pr-5'>

          <div>
            <h3 className='primary_text_bold'>Usuario</h3>
            <p className='primary_text'>{pqrs.createdBy}</p>
          </div>


          <div>
            <h3 className='primary_text_bold'>Fecha</h3>
            <p className='primary_text'>{' '}
              {new Date().toDateString()}
            </p>
          </div>


          <div>
            <h3 className='primary_text_bold'>Tipo</h3>
            <div className='w-auto mt-1'>
              <div className='state_secundary  text-gray-700  bg-gray-200'>
                <span className='mr-2 w-2 h-2  bg-gray-800 rounded-full'></span>
                {tipoPQRS}
              </div>
            </div>
          </div>


          {tipoSubPQRS && (
            <div className='space-y-1'>
              <h3 className='primary_text_bold'>Tipo de {tipoPQRS}</h3>
              <p className='primary_text'>{tipoSubPQRS}</p>
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className='w-[80%]'>
          <div className='  flex flex-col'>
            <div>
              <h3 className='primary_text_bold'>Describe tu Solicitud</h3>
              <textarea
                className='mt-1 w-full h-32 p-2 border text-sm border-gray-300 rounded-md  shadow-md'
                placeholder='Descripción'
                {...register('description', {
                  required: {
                    value: true,
                    message: 'La descripción es requerida'
                  },
                  minLength: {
                    value: 10,
                    message: 'La descripción es muy corta'
                  },
                  maxLength: {
                    value: 500,
                    message: 'La descripción excede el limite de caracteres'
                  },
                })}
              ></textarea>
              {
                errors.description && errors.description.message ? (
                  <span className='block text-red-400 text-xs'>{String(errors.description.message)}</span>
                ) : null
              }


              <div>
                <i className="fa-solid fa-circle-info text-blue-700 px-2 "></i>
                <span className='primary_text'>
                  Esto nos servirá de ayuda para dar respuesta de manera oportuna a tu solicitud.
                </span>
              </div>
            </div>


            <div className='flex flex-row justify-center items-center space-x-5 w-full h-full border-dashed border-2 rounded-md p-5 border-gray-300 mt-3'>
              <div className='p-5'>
                <i className="fa-solid fa-cloud-arrow-up text-4xl text-zinc-800"></i>
              </div>

              <div className='flex flex-col ml-5 px-5 w-[65%] space-y-2'>
                <span className='primary_text_bold'>Selecciona una imagen o archivo</span>
                <span className='primary_text'>JPG, PNG o PDF donde el tamaño no supere 10MB</span>
              </div>
              <div className='w-[25%]'>
                <input
                  type='file'
                  accept='.pdf, .png, .jpg, .jpeg'
                  onChange={(e) => {
                    setFile(e.target.files?.[0])
                  }}
                  ref={fileInputRef}
                  className='hidden'
                />
                <OperationsButton label='Cargar Archivos' onClick={handleButtonClick} color={secondaryColor} colorHover={secondaryColorHover} type={'button'} />

              </div>
            </div>
            <div className='flex justify-end mt-5 space-x-4'>

              <OperationsButton label='Volver' onClick={returnMenu} color={secondaryColor} colorHover={secondaryColorHover} type={'button'} />
              <OperationsButton label='Enviar' color={primaryColor} colorHover={primaryColorHover} type={"submit"} />
            </div>
          </div>
        </form>

      </section>
    </section >

  );
};


// eslint-disable-next-line import/no-default-export
export default CrearPqrs;
