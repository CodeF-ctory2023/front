interface SociosProps{
    socios: Array<Socio>
    isClicked: boolean
    id: number
    grupoActive: number
    // eslint-disable-next-line @typescript-eslint/ban-types
    stablishSocios: Function
    sociosToShow: Array<Socio>
}

type Socio = {
    cedula: number
    nombre: string
    ciudad: number
    usuario: string
    clave: string
    numeroDeServicios: number
    promedioDeCalificacion: number
    numeroDeAmonestaciones: number
    numeroDeFelicitaciones: number
  }; 

const Socios = ({socios, isClicked, id, stablishSocios, grupoActive, sociosToShow}:SociosProps) =>{
    if(isClicked){
        if(grupoActive != id && socios.length != 0){
            stablishSocios(id)
        }
        if(sociosToShow.length != 0)
        {return(
            <>
                <tr id="tablaSocios-m2">
                    <td><strong>Cedula</strong></td>
                    <td><strong>Nombre</strong></td>
                    <td><strong>Servicios completados</strong></td>
                    <td><strong>Calificación</strong></td>
                </tr>
                {sociosToShow.map(socio => {
                    return(
                    <tr key={socio.cedula}
                    id="tablaSocios-tr-m2">
                        <td>{socio.cedula}</td>
                        <td>{socio.nombre}</td>
                        <td>{socio.numeroDeServicios}</td>
                        <td>{socio.promedioDeCalificacion}</td>
                    </tr>)
                })}
            </>
        )}
    }
}
export  {Socios};