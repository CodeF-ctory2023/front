interface IconButtonProps {
    iconName: string;
    onClick?: () => void;
    colorHover: string;
}

const IconButton = ({ iconName, onClick, colorHover }: IconButtonProps) => {
    const IconComponent = (iconName: string) => {
        return (
            <i
                className={`${iconName} text-[1rem] hover:scale-105 active:scale-95`}
            ></i>
        );
    };
    return (
        <button
            onClick={onClick}
            className='mr-2 text-center'
            style={{ color: 'black', cursor: 'pointer' }}
            onMouseOver={(e) => (e.currentTarget.style.color = colorHover)}
            onMouseOut={(e) => (e.currentTarget.style.color = 'black')}
            onFocus={(e) => (e.currentTarget.style.color = colorHover)}
            onBlur={(e) => (e.currentTarget.style.color = 'black')}
        >
            {IconComponent(iconName)}
        </button>
    );
};

export { IconButton };
