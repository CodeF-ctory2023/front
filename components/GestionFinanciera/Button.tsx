interface ButtonProps {
  text?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
}

export const Button = ({ text, type, onClick }: ButtonProps) => {
  return (
    <button
      type={type ? type : 'button'}
      className='flex flex-col justify-center items-center self-stretch p-3 rounded-md bg-sky-700 text-white font-semibold'
      onClick={onClick}
    >
      {text}
    </button>
  );
};
