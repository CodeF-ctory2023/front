interface OptionsButtonProps {
  text: string;
  onClick?: () => void;

}

const OptionsButton = ({ text, onClick }: OptionsButtonProps) => {
  const style = `w-full block text-left py-2 px-4 border border-gray-100 rounded-lg 
                primary_text_bold hover:bg-slate-50 active:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-400 `

  return (
    <button
      className={style} onClick={onClick} >
      {text}
    </button>
  );

};

export { OptionsButton }
