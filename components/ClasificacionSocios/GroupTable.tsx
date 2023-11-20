import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Socios} from '@/components/ClasificacionSocios/Socios'
import {Groups} from '@/components/ClasificacionSocios/Groups';

interface tableProps{
    // eslint-disable-next-line @typescript-eslint/ban-types
    changeGrupos: Function
    // eslint-disable-next-line @typescript-eslint/ban-types
    changeSocios: Function
    filt: string
}


const GroupTable = ({changeGrupos, changeSocios, filt}: tableProps) => {
    const [grupos, setGrupos] = useState<Grupo[]>(
        [
            {
                ident: 1,
                descripcion: '0 a 10 servicios',
                rangomin: 0,
                rangomax: 10,
                ciudad: 1,
                cantidadPorGrupo: 3,
                isClicked: false
            },
            {
                ident: 2,
                descripcion: '10 a 20 servicios',
                rangomin: 11,
                rangomax: 20,
                ciudad: 1,
                cantidadPorGrupo: 10,
                isClicked: false
            },
            {
                ident: 3,
                descripcion: '0 a 10 servicios',
                rangomin: 0,
                rangomax: 10,
                ciudad: 2,
                cantidadPorGrupo: 50,
                isClicked: false
            },
            {
                ident: 4,
                descripcion: '10 a 20 servicios',
                rangomin: 11,
                rangomax: 20,
                ciudad: 2,
                cantidadPorGrupo: 20,
                isClicked: false
            },
            {
                ident: 5,
                descripcion: '0 a 10 servicios',
                rangomin: 0,
                rangomax: 10,
                ciudad: 3,
                cantidadPorGrupo: 50,
                isClicked: false
            },
            {
                ident: 6,
                descripcion: '10 a 20 servicios',
                rangomin: 11,
                rangomax: 20,
                ciudad: 3,
                cantidadPorGrupo: 20,
                isClicked: false
            },
            {
                ident: 7,
                descripcion: '20 a 100 servicios',
                rangomin: 20,
                rangomax: 100,
                ciudad: 3,
                cantidadPorGrupo: 20,
                isClicked: false
            }
        ]
    )
    const [changeFilt, setChangeFilt] = useState<string>('')
    const [grupoHandle, setGrupoHandle] = useState<number>(0)
    const [gruposToShow, setGruposToShow] = useState<Grupo[]>([])
    const [socios, setSocios] = useState<Socio[]>([]);
    const [sociosToShow, setSociosToShow] = useState<Socio[]>([])
    const [grupoActive, setGrupoActive] = useState<number>(0)
    const [fullLoaded, setFullLoader] = useState<boolean>(false)

    type Grupo = {
        ident: number
        descripcion: string
        rangomin: number
        rangomax: number
        ciudad: number
        cantidadPorGrupo: number
        isClicked: boolean
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

    const cargarSocios = async () => {
        return axios
            .get('http://localhost:8080/api/socio/findAll')
            .then((response) => {  
                const aux:Array<Socio> = response.data
                setSocios(aux);
            })
    }
    useEffect(() => {
        cargarSocios();
    }, []);

    
    if(socios.length != 0 && !fullLoaded){
        const grupoP = grupos.map(grupo => {
            const counter = socios.filter(socio => {
                return( grupo.rangomin <= socio.numeroDeServicios && socio.numeroDeServicios <= grupo.rangomax)
            })
            const newGrupo = {...grupo, cantidadPorGrupo: counter.length}
            return newGrupo
        })
        //console.log(grupoP)
        setFullLoader(true)
        setGrupos(grupoP)
        setGruposToShow(grupoP)
        changeGrupos(grupoP.length)
        changeSocios(socios.length)
    }

    if(fullLoaded && filt != changeFilt){ // Se hizo un cambio
        setGruposToShow(
            grupos.filter(grupo => 
                grupo.descripcion.toLowerCase().includes(filt.toLowerCase())
                || grupo.ciudad.toString().toLowerCase().includes(filt.toLowerCase()) 
                || grupo.ident.toString().toLowerCase().includes(filt.toLowerCase())
            )
        )
        setChangeFilt(filt)
    }


    const stablishSocios = (id:number) => {
        const group = grupos.filter(grupo => grupo.ident == id)[0]
        
        const aux = socios.filter(socio => {const prueba = ( group.rangomin <= socio.numeroDeServicios && socio.numeroDeServicios<= group.rangomax)
            return prueba
        })
        if(socios.length != 0){
            setGrupoActive(id)
        }
        setSociosToShow(aux)
    }
    const rowHandler = (id: number) =>{
        //console.log("me clickó");
        const auxGrupos = grupos.map(grupo => {
            if(grupo.ident == id){
                const newGrupo = {...grupo, isClicked: !grupo.isClicked}
                return newGrupo
            }
            else{
                if(grupo.isClicked){
                    const newGrupo = {...grupo, isClicked: false}
                    return newGrupo
                }
                else{
                    return grupo
                }
            }
        })

        const auxGruposToShow = gruposToShow.map (
            grupo => {
                if(grupo.ident == id){
                    const newGrupo = {...grupo, isClicked: !grupo.isClicked}
                    return newGrupo
                }
                else{
                    if(grupo.isClicked){
                        const newGrupo = {...grupo, isClicked: false}
                        return newGrupo
                    }
                    else{
                        return grupo
                    }
                }
        })
        setGrupos(auxGrupos)
        setGruposToShow(auxGruposToShow)
        setGrupoHandle(id)
    }



    return (

        <table className='w-full socios-table-m2' cellSpacing="1">

            <thead className="bg-zinc-400">
                <tr>
                    <th>Grupos Creados</th>
                    <th>Descripción del Grupo</th>
                    <th>Ciudad del Grupo</th>
                    <th>Cantidad por Grupo</th>
                </tr>
            </thead>
            <tbody>
                {gruposToShow.map(grupo => 
                <>
                    <Groups grupo={grupo} rowHandler={rowHandler} grupoHandle={grupoHandle}/>
                    <Socios key={grupo.ident} socios={socios} isClicked={grupo.isClicked} id={grupo.ident} stablishSocios={stablishSocios} grupoActive={grupoActive} sociosToShow={sociosToShow}/>                  
                </>
                )}
            </tbody>
        </table>

    );
};

export { GroupTable };