interface RellenoProps {
    texto?: string;
    ancho?: string;
    alto?: string;
};


const Relleno = ({ texto="componente", ancho="w-[200px]", alto="h-[500px]" }: RellenoProps) => {
    return (

        <div className={`${ancho} ${alto} border border-red-500 flex justify-center items-center`}>
            <span className="text-black">{texto}</span>
        </div>
        
    )
};

export { Relleno };