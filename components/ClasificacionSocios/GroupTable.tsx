import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillPersonFill } from "react-icons/bs";


const GroupTable = () => {

    const [socios, setSocios] = useState<Socio[]>([]);

    type Socio = {
        cedula: string;
        nombre: string;
        ciudad: string;
        numeroDeServicios: number;
      };

    const cargarSocios = async () => {
        return axios
            .get('http://localhost:8080/api/socio/findAll')
            .then((response) => {
                console.log("Response data1: ", response.data);
                setSocios(response.data);
            }).catch(error => {
                console.error("Error al cargar socios: ", error);
            })
    }

    useEffect(() => {
        cargarSocios()
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
    }, []);

    return (

        <table className='w-full socios-table-m2'>

            <thead className="bg-neutral-300">
                <tr>
                    <th>Grupos Creados</th>
                    <th>Descripción del Grupo</th>
                    <th>Ciudad del Grupo</th>
                    <th>Cantidad por Grupo</th>
                </tr>
            </thead>

            <tbody>
                {socios.length > 0 &&
                    socios.map((socio) => (
                        <tr className="" key={socio.cedula}>
                            <td className="flex gap-5 items-center">
                                <span>
                                    <BsFillPersonFill className="w-10 h-10 bg-red-300 px-1 py-1 border-black border-solid border-2 rounded-full" />
                                </span>{socio.cedula}
                            </td>
                            <td>{socio.nombre}</td>
                            <td>{socio.ciudad}</td>
                            <td>{socio.numeroDeServicios}</td>
                        </tr>
                    ))}

                <tr>

                    <td className="flex gap-5 items-center">
                        <span>
                            <BsFillPersonFill className="w-10 h-10 bg-red-300 px-1 py-1 border-black border-solid border-2 rounded-full" />
                        </span>Grupo 1
                    </td>
                    <td>0 viajes</td>
                    <td>Medellín</td>
                    <td>16 socios</td>
                </tr>
                <tr>
                <td className="flex gap-5 items-center">
                        <span>
                            <BsFillPersonFill className="w-10 h-10 bg-red-300 px-1 py-1 border-black border-solid border-2 rounded-full" />
                        </span>Grupo 2
                    </td>
                    <td>10 viajes</td>
                    <td>Medellín</td>
                    <td>12 socios</td>
                </tr>
            </tbody>
        </table>

    );
};

export { GroupTable };