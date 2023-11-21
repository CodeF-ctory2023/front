import { MdMenu } from "react-icons/md";
import { IconType } from "react-icons";
import Link from "next/link";

interface ChagnePageButtonProps {
    texto?: string;
    Icono?: IconType;
    href?: string;
}


const ChagnePageButton = ({ 
    texto = "componente", 
    Icono = MdMenu, 
    href="#" }: ChagnePageButtonProps) => {
    return (
             <Link 
             href={href}
             className="flex gap-1 w-full justify-between items-center p-3 bg-white rounded-lg hover:scale-105 hover:duration-200 shadow-md">
                
                <Icono className="w-10 h-8  text-gray-400"/>
                <span className="text-gray-500 text-xl w-4/5 text-center">{texto}</span>
                <MdMenu className="w-10  h-8  text-gray-400 font-bold"/>

             </Link>
    )
};

export { ChagnePageButton };