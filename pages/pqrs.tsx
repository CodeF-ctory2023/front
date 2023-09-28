/* eslint-disable no-console */
import { ButtonPqrs } from "@/components/Buttons";
import { useRef } from "react";

const Home = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

 const showForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formRef.current === null) return console.log("formRef.current is null");
    const formData = new FormData(formRef.current);
    console.log(formData.get("message"));
    //get the name of the file, first cast file to File type
    const file = formData.get("formFileSm") as File;
    console.log(file.name);
    
  }


  return (
    <div className='flex h-screen w-full items-center justify-center bg-gray-200'>
      <div className='grid grid-rows-1 gap-y-8 w-7/12'>
        <div className='flex flex-row space-x-3 justify-start'>
          <ButtonPqrs icon = "fa-solid fa-house" text = "inicio"/>
          <ButtonPqrs icon = "fa-solid fa-car" text = "viajar"/>
          <ButtonPqrs icon = "fa-solid fa-clock-rotate-left" text = "historial"/>
        </div>
        <div className='flex justify-center'>
          <h1 className='text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl'>
            PQRS
          </h1>
        </div>
        <div className='grid grid-cols-5 gap-x-1 border border-gray-400 rounded'>
          <div className='flex flex-col p-2 col-span-2'>
            <div>
              <span className='font-bold'>Nombre:</span>
              <span className='ml-2'>Rony Banol</span>
            </div>
            <div>
              <span className='font-bold'>User:</span>
              <span className='ml-2'>rony.banol</span>
            </div>
            <div className='overflow-auto'>
              <span className='font-bold'>Correo:</span>
              <span className='ml-2'>rony.banol@udea.edu.co</span>
            </div>
            <div>
              <span className='font-bold'>Teléfono:</span>
              <span className='ml-2'>3045896123</span>
            </div>
            <div>
              <span className='font-bold'>Estado PQRS:</span>
              <span className='ml-2'>inválida</span>
            </div>
            <div>
              <span className='font-bold'>Radicado:</span>
              <span className='ml-2'>48-8</span>
            </div>
            <div>
              <span className='font-bold'>Fecha:</span>
              <span className='ml-2'>15/09/2023</span>
            </div>
          </div>
          <form className='col-span-3'
          ref={formRef} onSubmit={(e) => showForm(e)}>
            <div className='flex flex-col h-full w-full space-y-2 p-2'>
              <textarea
                name='message'
                id="message"
                rows={4}
                className='h-full block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Write your thoughts here...'
              ></textarea>
              <div className='flex w-full justify-end'>
                <input
                  type='file'
                  className='relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none'
                  name='formFileSm'
                />
              </div>
              <div className='flex w-full justify-end'>
                <input
                  type='submit'
                  value='Enviar PQRS'
                  className='w-1/3 bg-green-600 hover:bg-green-700 
                hover:scale-105 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white focus:outline-none active:scale-95
                cursor-pointer'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
