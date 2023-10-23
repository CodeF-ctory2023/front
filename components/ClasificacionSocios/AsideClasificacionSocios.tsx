import { Relleno } from "./Relleno";

const AsideClasificacionSocios = () => {

    return (

        <div className="flex flex-col w-72 bg-gray-200 h-full items-center gap-16 px-5 py-5 font-m2">

            <Relleno texto="Perfil" alto="h-[60px]" ancho="w-full" />
            <div className="flex flex-col items-center gap-4 w-full">

                <a className="cursor-pointer text-blue-500 hover:underline hover:text-blue-700 text-2xl" href="http://localhost:3000/ClasificacionSocios/M2ConfigurarCriterios">Configurar Criterios</a>

                <a className="cursor-pointer text-blue-500 hover:underline hover:text-blue-700 text-2xl" href="http://localhost:3000/ClasificacionSocios/M2VisualizarGrupos">Visualizar Grupos</a>

            </div>

        </div>

    );
};

export { AsideClasificacionSocios };