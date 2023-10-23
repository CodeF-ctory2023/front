import { PqrsTableView } from "./PqrsTableView"
import { NavFilterPqrs } from "./NavFilterPqrs"


const PqrsMainView = () => {
    return (
        <section className="flex justify-center items-center w-full h-full bg-slate-100">
            <section className="w-[70%] h-[60%] ">
                <section className="w-full">
                    <div className=" mb-5 title "><span>MIS PQRS</span></div>
                    <NavFilterPqrs />

                </section>
                <section className="w-full h-auto mt-5  ">
                    <div className=" h-full rounded-xl bg-zinc-50 p-5">
                        <PqrsTableView />
                    </div>
                </section>
            </section>

        </section>


    )

}

export { PqrsMainView }