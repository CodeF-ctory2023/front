import {BiSolidUpArrow} from "react-icons/bi";

const NumberOfSocios =()=>{
    return(

        <div className="w-[226px] h-[130px] bg-[#F8F8F8] rounded-xl flex flex-col">
        <div className="pl-4 pt-6 flex flex-row gap-4 items-center">
          <span className="text-[#757D8A] text-lg font-medium"> Número de Socios</span>
          <span className="text-blue-500"><BiSolidUpArrow/></span>
        </div>
        <span className=" pl-4 text-[#404D61] font-bold text-2xl">7</span>
      </div>
      
    )
};

export {NumberOfSocios};