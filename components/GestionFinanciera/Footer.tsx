export const Footer = () => {
  return (
    <footer className='bg-sky-600 flex items-start self-stretch pt-9 pb-14 px-36 gap-9'>
      <div className='flex flex-col items-start gap-2'>
        <div className='text-white font-semibold text-4xl'>SSMU</div>
        <div className='text-slate-300'>
          Experimenta de viajes seguros y rápidos.
        </div>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <div className='text-white text-xl flex items-center gap-2 font-semibold'>
          CONTACTO
        </div>
        <div className='text-slate-300 flex flex-col items-center pt-4 gap-3'>
          <div>+55555555</div>
          <div>mail@mail.com</div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <div className='text-white text-xl flex items-center gap-2 font-semibold'>
          AYUDA
        </div>
        <div className='text-slate-300 flex flex-col items-center pt-4 gap-3'>
          <a href='blank'>Políticas de privacidad</a>
          <a href='blank'>Políticas de uso</a>
        </div>
      </div>
    </footer>
  );
};
