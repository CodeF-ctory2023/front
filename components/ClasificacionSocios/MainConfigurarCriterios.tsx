import { BlueButton } from "./BlueButton";

const MainConfigurarCriterios = () => {

    return (

        <div className="flex flex-col px-5 py-5 w-full font-m2">
            <h2 className="titles-m2 pb-10 border-b">Configuración de los Grupos de Criterios</h2>

            <div className="flex flex-col py-5 items-center w-full h-full">

                <h2 className="titles-m2 mb-10">Creación de Grupos de Clasificación:</h2>

                <div className="grid grid-cols-2 gap-x-12 gap-y-20">

                    <div className="flex flex-col">
                        <span>Nombre de grupo</span>
                        <input className="w-96 h-16 rounded-lg border border-gray-400 py-4 px-4" type="text" placeholder="Type here" />
                    </div>

                    <div className="flex flex-col">
                        <span>Nombre de grupo</span>
                        <input className="w-96 h-16 rounded-lg border border-gray-400 py-4 px-4" type="text" placeholder="Type here" />
                    </div>

                    <div className="flex flex-col">
                        <span>Nombre de grupo</span>
                        <input className="w-96 h-16 rounded-lg border border-gray-400 py-4 px-4" type="text" placeholder="Type here" />
                    </div>

                    <div className="flex flex-col">
                        <span>Nombre de grupo</span>
                        <input className="w-96 h-16 rounded-lg border border-gray-400 py-4 px-4" type="text" placeholder="Type here" />
                    </div>

                </div>

                <div className="flex justify-evenly mt-60 w-full">
                    <BlueButton text="Guardar Información" />
                    <BlueButton text="Reiniciar Proceso" />
                </div>

            </div>
        </div>
        
    );
};

export { MainConfigurarCriterios };