interface ButtonProps {
  text?: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      type='button'
      className='flex flex-col justify-center items-center self-stretch py-4 px-4 rounded-md bg-sky-700 text-white font-semibold'
      onClick={onClick}
    >
      {text}
    </button>
  );
};
