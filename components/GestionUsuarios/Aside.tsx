import { useRouter } from 'next/router';
export const  Aside = () => {
  
  const router = useRouter();
  return (
    <aside className='w-1/6 fixed top-12 left-0 h-full bg-asideGray p-4 flex items-center flex-col'>
      <h2 className='font-bold text-2xl mb-4 mt-8'>Menú</h2>
      <ul className='list-none p-0'>
        <li><button onClick={() => router.push('/GestionUsuarios/Home')} className="text-blue-700 font-bold bg-transparent" >Inicio</button></li>
        <li><button className="text-blue-700 font-bold bg-transparent" >Acerca de nosotros</button></li>
        <li><button className="text-blue-700 font-bold bg-transparent" >Contacto</button></li>
      </ul>
    </aside>
  )
}

