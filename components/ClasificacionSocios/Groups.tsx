import { BsFillPersonFill } from "react-icons/bs";

interface groupProps{
    grupo: Grupo
    // eslint-disable-next-line @typescript-eslint/ban-types
    rowHandler: Function
    grupoHandle?: number
}

type Grupo = {
    ident: number
    descripcion: string
    rangomin: number
    rangomax: number
    ciudad: number
    cantidadPorGrupo: number
    isClicked: boolean
}

const Groups = ({grupo, rowHandler}: groupProps) =>{
    const changeActiveRow = () =>{
        rowHandler(grupo.ident)
    }

    return(
            <tr key={grupo.ident} onClick={changeActiveRow} className='cursor-pointer' >
                <td className="flex gap-5 items-center">
                    <span>
                        <BsFillPersonFill className="w-10 h-10 bg-red-300 px-1 py-1 border-black border-solid border-2 rounded-full" />
                    </span>Grupo {grupo.ident}
                </td>
                <td>{grupo.descripcion}</td>
                <td>Servicios completados</td>
                <td>{grupo.cantidadPorGrupo}</td>                    
            </tr>
    )
}

export {Groups};