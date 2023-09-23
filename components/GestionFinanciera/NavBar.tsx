import Image from 'next/image';
import { SearchBar } from './SearchBar';

export const NavBar = () => {
  return (
    <nav className='bg-sky-700 flex justify-between items-center self-stretch py-3 px-9'>
      <div className='text-white font-semibold text-4xl'>SSMU</div>
      <SearchBar />
      <div className='flex items-start gap-4'>
        <button type='button'>
          <Image src='/user-icon.svg' alt='' width={36} height={36} />
        </button>
        <button type='button'>
          <Image src='/menu.svg' alt='' width={36} height={36} />
        </button>
      </div>
    </nav>
  );
};
