import Link from 'next/link';

export const MenuUsers = () => {
  return (
    <div className='flex gap-4 bg-black/[0.7] text-white px-2 py-1 fixed top-8 right-8 z-50 rounded-lg'>
      <Link href='/' className='hover:text-green-400'>
        Usuario
      </Link>
      <Link href='/drivers/01' className='hover:text-green-400'>
        Conductor
      </Link>
    </div>
  );
};
