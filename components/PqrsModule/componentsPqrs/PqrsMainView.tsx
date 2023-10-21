import { PqrsTableView } from "./PqrsTableView"
import { NavFilterPqrs } from "./NavFilterPqrs"


const PqrsMainView = () => {
    return (
        <section className="flex justify-center items-center w-full h-full bg-slate-100">
            <section className="w-[80%] h-[60%] ">
                <section className="w-full">
                    <div className="  mb-5 font-semibold text-medium "><span>MIS PQRS</span></div>
                    <NavFilterPqrs />

                </section>
                <section className="w-full rounded-xl h-[50%]">
                    <div className=" h-full ">
                        <PqrsTableView />
                    </div>
                </section>
            </section>

        </section>


    )

}

export { PqrsMainView }