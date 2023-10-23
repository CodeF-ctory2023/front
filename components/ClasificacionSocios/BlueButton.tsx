interface BlueButtonProps {
    text?: string;
}

const BlueButton = ({ text = "Blue Button" }: BlueButtonProps) => {
    return (

        <div className="flex gap-3 items-center">
            <button className="text-white px-4 py-3 rounded-xl border-none cursor-pointer bg-blue-500 hover:bg-blue-400  hover:duration-150">
                {text}
            </button>
        </div>
        
    );
};

export { BlueButton };  