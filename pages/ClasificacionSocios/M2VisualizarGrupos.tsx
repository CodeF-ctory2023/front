import { AsideClasificacionSocios } from "@/components/ClasificacionSocios/AsideClasificacionSocios";
import { MainVisualizarGrupos } from "@/components/ClasificacionSocios/MainVisualizarGrupos";

const M2ConfigurarCriterios = () => {

    return (


        <div className="w-screen h-screen bg-white overflow-x-hidden">
            <div className="flex w-[1400px] h-screen bg-white overflow-x-hidden m-auto">

                <AsideClasificacionSocios />
                <MainVisualizarGrupos />

            </div>
        </div>

    );
};

export default M2ConfigurarCriterios;