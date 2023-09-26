

const Footer = () => {
  const getYear = () => {
    return new Date().getFullYear();
  }
  return (
    <footer className="w-full flex flex-col text-white text-xs px-3 py-2  bg-black">
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <span>© {getYear()} CodeF@ctory UdeA Inc.</span>
        <ul className="flex gap-4">
          <li className="cursor-pointer hover:text-gray-500">
            <a>Privacidad</a>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <a>Accesibilidad</a>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <a>Condiciones</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export { Footer };