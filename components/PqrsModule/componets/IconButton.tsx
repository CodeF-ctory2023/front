import React from 'react';
import { IconType } from 'react-icons/';
import * as icons from 'react-icons/md'; // /md is the icon pack to use, you can change to another

interface IconButtonProps {
    iconName: string;
    onClick?: () => void;
    overColor: string;

}

function IconButton({ iconName, onClick, overColor }: IconButtonProps) {
    const iconKey = `Md${iconName}`; // Build the icon key using the package prefix
    const IconComponent = icons[iconKey as keyof typeof icons] as IconType;

    const hoverClass = `text-${overColor}-600`;

    return (
        <button
            onClick={onClick}
            className='mr-2 text-center'
            style={{ color: 'black', cursor: 'pointer' }}
            onMouseOver={(e) => (e.currentTarget.style.color = overColor)}
            onMouseOut={(e) => (e.currentTarget.style.color = 'black')}
        >
            <IconComponent className={` text-[1.3rem] hover:scale-105 active:scale-95`} />
        </button>
    );
};


export { IconButton };

