import React from 'react';

interface OperationsButtonProps {
    label: string;
    onClick?: () => void;
    color: string;
    colorHover: string;

}


const OperationsButton = ({ label, onClick, color, colorHover }: OperationsButtonProps) => {
    return (
        <button
            className=' hover:scale-105 px-5 py-2 text-sm leading-5 
                    rounded-full font-semibold text-white focus:outline-none active:scale-95'
            style={{ background: color, cursor: 'pointer' }}
            onMouseOver={(e) => (e.currentTarget.style.background = colorHover)}
            onMouseOut={(e) => (e.currentTarget.style.background =  color )}
            onFocus={(e) => (e.currentTarget.style.color = colorHover)}
            onBlur={(e) => (e.currentTarget.style.color = 'black')}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export { OperationsButton }
