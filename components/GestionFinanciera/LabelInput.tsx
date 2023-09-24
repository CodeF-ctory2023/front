import { useState } from 'react';

interface LabelInputProps {
  children: React.ReactNode;
  inputType: React.HTMLInputTypeAttribute;
  id: string;
}

export const LabelInput = ({ children, inputType, id }: LabelInputProps) => {
  const [val, setVal] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputType != 'number') {
      return;
    }
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setVal(e.target.value);
    }
  };

  return (
    <div className='flex justify-between items-center self-stretch gap-6'>
      <label htmlFor={id}>{children}</label>
      {
        // TODO: check outline like th searchbar
      }
      <div className='pad-5 outline outline-1'>
        <input
          type={inputType == 'number' ? 'text' : inputType}
          value={val}
          onChange={handleChange}
          id={id}
        ></input>
      </div>
    </div>
  );
};
