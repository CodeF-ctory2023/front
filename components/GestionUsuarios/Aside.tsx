import '../app.css'

export default function Aside() {
  return (
    <aside className='w-1/6 fixed top-12 left-0 h-full bg-asideGray p-4 '>
      <h2 className='font-bold text-2xl mb-4'>Menú</h2>
      <ul className='list-none p-0'>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Acerca de nosotros</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
    </aside>
  )
}