

export const ServiceList = () => {
  return (
    <article className='p-4 bg-green-400 max-w-sm w-96 rounded-lg shadow-md pointer-events-auto fixed bottom-8 right-8 z-50'>
      <div className='flex flex-col gap-2 items-start'>
        <div className='flex gap-2'>
          <div className='bg-gray-300 w-12 h-12 rounded-full overflow-hidden'>
            <img
              src='/assets/img/lucas.PNG'
              alt='Foto del conductor'
              className='max-w-full h-auto'
            />
          </div>
          <div className='text-sm'>
            <h2 className='font-bold'>Nombre del conductor</h2>
          </div>
        </div>
        <div className='flex flex-col gap-2 col-span-2 bg-white rounded-lg p-4 text-sm h-52'>
          <h3 className='font-bold text-base'>Servicios disponibles</h3>
          <p className="bg-yellow-200 rounded-md p-1">En este momento no hay servicios disponibles.</p>
        </div>
      </div>
    </article>
  );
};
