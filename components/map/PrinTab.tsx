import React from 'react'

const PrinTab = () => {
  return (
    <div>
        <button className="w-64 h-16 absolute top-36 left-28 bg-blue-500 bg-opacity-70  rounded-full flex items-center justify-center">
    <span className="text-black text-lg font-bold">Activar mi ubicación</span>
        </button>

    <div className="w-74 h-84 absolute top-56 left-20 bg-white bg-opacity-70 rounded-lg flex flex-col items-center justify-center">
            <div className="w-72 h-14 bg-blue-500 bg-opacity-70 rounded-t-lg flex items-center justify-center">
                <span className="text-black text-2xl font-bold">Viaje</span>
            </div>
            <div ><input  className="w-64 h-14 mt-4 bg-gray-300 bg-opacity-70 rounded-md flex items-center justify-center" placeholder='  Ingresa tu destino'/>
            </div>
            <div ><input className="w-64 h-14 mt-4 bg-gray-300 bg-opacity-70 rounded-md flex items-center justify-center" placeholder='  Ingresa tu ubicación'/>
                
            </div>
            <button className="w-32 h-10 mt-4 bg-blue-500 bg-opacity-70 rounded-md flex items-center justify-center">
                <span className="text-black text-lg font-bold">Solicitar</span>
            </button>
            

    </div>
    </div>
  )
}
export{PrinTab}