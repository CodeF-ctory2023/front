import axios from "axios";
import { BlueButton } from "./BlueButton";
import { useState } from "react";

const MainConfigurarCriterios = () => {

    const [nombreGrupo, setNombreGrupo] = useState("");
    const [descripcionGrupo, setDescripcionGrupo] = useState("");
    const [criterioClasificacion, setCriterioClasificacion] = useState("");
    const [valorCriterio, setValorCriterio] = useState("");
    

    const crearGrupo = async () => {
        try {
          await axios.post("http://localhost:8080/api/grupo/crearGrupo", {
            idGrupo: 13,
            nombreGrupo: nombreGrupo,
            descripcion: descripcionGrupo,
            criterio: criterioClasificacion,
            valorCriterio: parseInt(valorCriterio, 10), // Asegúrate de convertir a número si es necesario
          });
    
          // Resto del código si la solicitud es exitosa
    
        } catch (error) {
          //console.error(error);
          window.alert("Error al crear el grupo");
        }
      };
      
    return (

        <div className="flex flex-col px-5 py-5 w-full font-m2">
            <h2 className="titles-m2 pb-10 border-b">Configuración de los Grupos de Criterios</h2>

            <div className="flex flex-col py-5 items-center w-full h-full">

                <h2 className="titles-m2 mb-10">Creación de Grupos de Clasificación:</h2>

                <div className="grid grid-cols-2 gap-x-12 gap-y-20">

                    <div className="flex flex-col">
                        <span>Nombre del grupo</span>
                        <input 
                        className="w-96 h-16 rounded-lg border border-gray-400 py-4 px-4" 
                        type="text" 
                        placeholder="Type here" 
                        value={nombreGrupo}
                        onChange={(e) => setNombreGrupo(e.target.value)}/>
                    </div>

                    <div className="flex flex-col">
                        <span>Descripcion del grupo</span>
                        <input 
                        className="w-96 h-16 rounded-lg border border-gray-400 py-4 px-4" 
                        type="text" 
                        placeholder="Type here" 
                        value={descripcionGrupo}
                        onChange={(e) => setDescripcionGrupo(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <span>Criterio de clasificacion</span>
                        <input 
                        className="w-96 h-16 rounded-lg border border-gray-400 py-4 px-4" 
                        type="text" 
                        placeholder="Type here" 
                        value={criterioClasificacion}
                        onChange={(e) => setCriterioClasificacion(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <span>Valor criterio</span>
                        <input 
                        className="w-96 h-16 rounded-lg border border-gray-400 py-4 px-4" 
                        type="text" 
                        placeholder="Type here"
                        value={valorCriterio}
                        onChange={(e) => setValorCriterio(e.target.value)}
                        />
                    </div>

                </div>

                <div className="flex justify-evenly mt-60 w-full">
                    <BlueButton text="Guardar Información" onClick={crearGrupo} />
                    <BlueButton text="Reiniciar Proceso" />
                </div>

            </div>
        </div>
        
    );
};

export { MainConfigurarCriterios };