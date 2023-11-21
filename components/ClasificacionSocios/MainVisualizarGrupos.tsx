import { BlueButton } from "@/components/ClasificacionSocios/BlueButton";
import { GroupTable } from "@/components/ClasificacionSocios/GroupTable";
import { NumberOfGroups } from "@/components/ClasificacionSocios/NumberOfGroups";
import { NumberOfSocios } from "@/components/ClasificacionSocios/NumberOfSocios";
import { useState } from 'react';

const MainVisualizarGrupos = () => {
    const [grupos, setGrupos] = useState<number>(0)
    const [socios, setSocios] = useState<number>(0)
    const [filter, setFilter] = useState<string>('')

    const changeGrupos =(count: number) =>{
        setGrupos(count)
    }
    const changeSocios =(count: number) =>{
        setSocios(count)        
    }
    
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value)
    }

    return (
        <div className="flex flex-col px-7 py-7 font-m2 m-auto h-screen">
            <div className="flex items-center border-b gap-10 pb-5">
                <h2 className="titles-m2 text-center">Visualización de Grupos</h2>
                <input className="w-96 h-16 rounded-lg border border-gray-400 py-4 px-4 input-configuracion-m2" type="text" value={filter} onChange={handleInput} />
                <BlueButton text="Reiniciar Proceso" />
            </div>


            <div className="flex flex-col py-5 items-center w-full h-full gap-10">

                <div className="flex flex-col justify-start w-full">
                    <h3 className="titles-m2">Grupos desplegados:</h3>
                    <span className="subtitles-m2">{grupos} resultados encontrados</span>
                </div>


                <div className="grid grid-cols-2 gap-x-20">

                    <NumberOfGroups groups={grupos}/>
                    <NumberOfSocios socios={socios}/>
                    
                </div>

                <div className="flex justify-center w-full">
                    <GroupTable changeGrupos={changeGrupos} changeSocios={changeSocios} filt={filter}/>
                </div>

            </div>
        </div>
        
    );
};

export { MainVisualizarGrupos };