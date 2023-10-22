import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import {faBars} from "@fortawesome/free-solid-svg-icons"
 const NavBar = () => {
  return (
    <div className="w-full text-center h-20 bg-blue-500 position:absolute " > 
    <div className="absolute left-36 top-6 text-white text-center text-3xl font-inter font-medium break-words">SSMU</div>
    
    
          <div ><input className="w-1/2 h-10 absolute top-5 left-1/2 transform -translate-x-1/2 bg-gray-300 rounded-full flex items-center justify-center"  type="text" id="start" name="start" placeholder="   Buscar en SSMU" /></div>
        <button className="w-32 h-10 absolute right-80 top-5 flex items-center justify-center  rounded-full" style={{fontSize:"2em"}} ><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          <button className="w-16 h-16 absolute left-4 top-1" style={{fontSize:"3em"}} ><FontAwesomeIcon icon={faBars}/></button>
          </div>
  )
}

export {NavBar}
