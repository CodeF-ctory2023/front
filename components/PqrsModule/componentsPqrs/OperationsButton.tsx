import React from 'react';

interface OperationsButtonProps {
    label: string;
    onClick?: () => void;
    color: string;
    colorHover: string;
    type?: "button"| "submit" | "reset";

}


const OperationsButton = ({ label, onClick, color, colorHover,type }: OperationsButtonProps) => {
    return (
        <button
            className=' hover:scale-105 px-5 py-1 text-sm leading-5 
                    rounded-lg font-semibold text-white shadow-md focus:outline-none active:scale-95'
            style={{ background: color, cursor: 'pointer' }}
            onMouseOver={(e) => (e.currentTarget.style.background = colorHover)}
            onMouseOut={(e) => (e.currentTarget.style.background = color)}
            onFocus={(e) => (e.currentTarget.style.color = colorHover)}
            onBlur={(e) => (e.currentTarget.style.color = 'white')}
            onClick={onClick}
            type={type}
        >
            {label}
        </button>
    );
};

export { OperationsButton }
