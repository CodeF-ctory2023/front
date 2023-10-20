import Image from 'next/image';
import { useState } from 'react';

export const SearchBar = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`sm:bg-slate-200 bg-none flex items-start py-2 px-2 sm:w-6/12 gap-3 sm:hover:cursor-auto hover:cursor-pointer ${
        focused && 'w-min flex bg-slate-200'
      }`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <Image
        className={`sm:inline hidden`}
        src='/search.svg'
        width={24}
        height={24}
        alt=''
      ></Image>
      <Image
        className={`sm:hidden ${focused && 'hidden'}`}
        src='/search-white.svg'
        width={24}
        height={24}
        alt=''
        onClick={() => {
          setFocused(true);
          setTimeout(() => document.getElementById('search-bar')?.focus());
        }}
      ></Image>
      <input
        id='search-bar'
        type='search'
        className={`bg-slate-200 focus:outline-none sm:inline sm:w-full min-w-min ${
          focused ? 'inline' : 'hidden'
        }`}
        placeholder='Buscar en SSMU'
      />
    </div>
  );
};
