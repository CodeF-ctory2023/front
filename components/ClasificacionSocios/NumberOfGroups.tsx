import { BiSolidDownArrow} from "react-icons/bi";

interface NumberOfGroupsProps{
  groups: number
}


const NumberOfGroups =({groups}:NumberOfGroupsProps)=>{
    return(

        <div className=" w-[226px] h-[130px] bg-[#eeeeee] rounded-xl flex flex-col">
        <div className="pl-4 pt-6 flex flex-row gap-4 items-center">
          <span className="text-[#575d66] text-lg font-medium"> Número de Grupos</span>
          <span className="text-red-600"><BiSolidDownArrow/></span>
        </div>
        <span className=" pl-4 text-[#404D61] font-bold text-2xl">{groups}</span>
      </div>
      
    )
};

export {NumberOfGroups};