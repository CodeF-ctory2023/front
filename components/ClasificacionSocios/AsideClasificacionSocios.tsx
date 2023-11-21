import { ChagnePageButton } from "./ChangePageButton";
import { Perfil } from "./Perfil";
import { MdOutlineAutoAwesomeMosaic } from "react-icons/md";
import { PiSquaresFour } from "react-icons/pi";

const AsideClasificacionSocios = () => {

    return (

        <div className="flex flex-col w-[320px] bg-gray-200 h-full items-center gap-16  font-m2 relative">

            <div className="flex flex-col top-0 left-0 h-screen bg-gray-200 w-[320px] items-center gap-16 font-m2 px-5 py-5 fixed">


                <Perfil texto="Admin" />
                <div className="flex flex-col items-center gap-4 w-full">


                    <ChagnePageButton texto="Configurar Criterios" href="/ClasificacionSocios/M2ConfigurarCriterios"
                        Icono={PiSquaresFour} />
                    <ChagnePageButton texto="Visualizar Grupos" href="/ClasificacionSocios/M2VisualizarGrupos"
                        Icono={MdOutlineAutoAwesomeMosaic} />

                </div>

            </div>


        </div>

    );
};

export { AsideClasificacionSocios };