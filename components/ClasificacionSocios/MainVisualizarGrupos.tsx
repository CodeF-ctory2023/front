import { BlueButton } from "./BlueButton";
import { GroupTable } from "./GroupTable";
import { NumberOfGroups } from "./NumberOfGroups";
import { NumberOfSocios } from "./NumberOfSocios";

const MainVisualizarGrupos = () => {

    return (
        
        <div className="flex flex-col px-7 py-7 w-full font-m2">
            <div className="flex items-center border-b gap-10 pb-5">
                <h2 className="titles-m2 text-center">Visualización de Grupos</h2>
                <input className="w-96 h-16 rounded-lg border border-gray-400 py-4 px-4" type="text" placeholder="Type here" />
                <BlueButton text="Reiniciar Proceso" />
            </div>


            <div className="flex flex-col py-5 items-center w-full h-full gap-10">

                <div className="flex flex-col justify-start w-full">
                    <h3 className="titles-m2">Grupos desplegados:</h3>
                    <span className="subtitles-m2">6 resultados encontrados</span>
                </div>


                <div className="grid grid-cols-2 gap-x-20">

                    <NumberOfGroups />
                    <NumberOfSocios />
                    
                </div>

                <div className="flex justify-center w-full">
                    <GroupTable />
                </div>

            </div>
        </div>
        
    );
};

export { MainVisualizarGrupos };