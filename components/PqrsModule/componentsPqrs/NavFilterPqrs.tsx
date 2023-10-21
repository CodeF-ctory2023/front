import { NAVFILTER } from "@/components/PqrsModule/utilities/utils"
import { useState } from "react";


const NavFilterPqrs = () => {
    const [selectedIdx, setSelectedIdx] = useState<null | number>(null);

    const handleItemClick = (index: number) => {
        setSelectedIdx(index);
    };


    return (
        <section>
            <div className='flex space-x-6'>
                {NAVFILTER.map((key, index) => (
                    <button
                        key={index}
                        className={` text-base text-zinc-500  hover:text-zinc-950 hover:font-semibold  ${selectedIdx === index ? 'selected' : ''}`}
                        onClick={() =>handleItemClick(index)}
                        
                    >
                        <span>{key}</span>
                        {selectedIdx === index && (
                            <div className='w-full h-[0.1rem] bg-zinc-950 border-y-[0.1rem] border-zinc-950 rounded-full'></div>
                        )}
                    </button>
                ))}

            </div>
            <div className='bg-slate-400 h-[0.1rem] w-full'></div>
        </section>

    );
}

export { NavFilterPqrs }