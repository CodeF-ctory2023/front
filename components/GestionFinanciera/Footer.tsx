import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='bg-sky-600 flex justify-between max-sm:flex-col items-start max-sm:items-center text-center self-stretch pt-9 pb-14 md:pr-36 md:pl-12 sm:pr-24 sm:pl-8 px-8 gap-9'>
      <div className='flex flex-col gap-2'>
        <div className='text-white font-semibold text-4xl'>SSMU</div>
        <div className='text-slate-300 pt-4'>
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
          <Link href='/blank'>Políticas de privacidad</Link>
          <Link href='/blank'>Políticas de uso</Link>
        </div>
      </div>
    </footer>
  );
};
