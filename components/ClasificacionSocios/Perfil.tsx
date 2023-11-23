import Image from 'next/image';

interface PerfilProps {
  texto?: string;
}

const Perfil = ({ texto = 'Usuario' }: PerfilProps) => {
  return (
    <div className='flex gap-8 w-full justify-center items-center'>
      <Image
        alt='Imagen de https://www.freepik.es/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_58509044.htm#query=perfil&position=6&from_view=search&track=sph&uuid=3bc88515-3bfd-4306-aad5-b502240f7a72 Freepik'
        src='/perfil-freepik.jpg'
        width={60}
        height={50}
        className='rounded-full h-full shadow-lg'
      ></Image>

      <div>
        <span className='text-gray-500'>Welcome back,</span>
        <h3 className='font-bold text-2xl text-gray-800'>{texto}</h3>
      </div>
    </div>
  );
};

export { Perfil };
