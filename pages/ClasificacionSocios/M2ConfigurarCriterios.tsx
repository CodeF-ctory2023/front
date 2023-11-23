import { AsideClasificacionSocios } from "@/components/ClasificacionSocios/AsideClasificacionSocios";
import { MainConfigurarCriterios } from "@/components/ClasificacionSocios/MainConfigurarCriterios";

const M2ConfigurarCriterios = () => {

    return (

        <div className="w-screen h-screen bg-white">
            <div className="flex w-[1400px] h-screen bg-white m-auto">

                <AsideClasificacionSocios />
                <MainConfigurarCriterios />

            </div>
        </div>


    );
};

export default M2ConfigurarCriterios;