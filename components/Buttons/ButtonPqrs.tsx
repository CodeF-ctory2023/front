import { FC } from "react";

interface Props{
    icon: string;
    text: string;
}

const ButtonPqrs: FC<Props> = ({icon, text}) => {
  return (
    <button
      className='bg-blue-600 hover:bg-blue-700 
hover:scale-105 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white focus:outline-none active:scale-95'
    >
      <i className= {`${icon} mr-2`}></i>
      {text}
    </button>
  );
};

export { ButtonPqrs };
