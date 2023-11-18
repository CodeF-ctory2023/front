

export default function Aside() {
  return (
    <aside className='w-1/6 fixed top-12 left-0 h-full bg-asideGray p-4 flex items-center flex-col'>
      <h2 className='font-bold text-2xl mb-4 mt-8'>Menú</h2>
      <ul className='list-none p-0'>
        <li><a className="text-blue-700 font-bold"  href="#">Inicio</a></li>
        <li><a className="text-blue-700 font-bold"  href="#">Acerca de nosotros</a></li>
        <li><a className="text-blue-700 font-bold"  href="#">Contacto</a></li>
      </ul>
    </aside>
  )
}