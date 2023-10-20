import { InputProps } from '@/types/Form';
import React from 'react';

export const FormInput: React.FC<InputProps> = ({
  inputType,
  inputValue,
  inputPlaceholder,
  inputDisabled,
  inputOnChange,
  inputIcon,
}) => {
  return (
    <div className='flex items-center gap-1 bg-white max-w-min pl-1 rounded-md'>
      {inputIcon}
      <input
        className='bg-white rounded-md p-1 text-sm outline-none'
        type={inputType}
        placeholder={inputPlaceholder}
        disabled={inputDisabled}
        value={inputValue}
        onChange={inputOnChange}
      />
    </div>
  );
};
