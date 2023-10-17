
import Link from 'next/link';

interface OptionsButtonProps {
    text : string;
    onClick?: () => void;
    href?: string;
    selectedOption?: string;

    
}

const OptionsButton = ({ text, onClick, href, selectedOption }: OptionsButtonProps) => {
    
    if (href) {
      return (
        <Link href={href}>
            
          <button className='w-full block text-left py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none' >
            {text}
          </button>
        </Link>
      );
    } else {
      return (
        <button className = {`w-full block text-left py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none ${selectedOption === text ? 'bg-blue-500 text-white' : ''}`} onClick={onClick} >
          {text}
        </button>
      );
    }
  };

export {OptionsButton}

