import { useEffect, useState } from 'react';

import { Alert } from '@/components/alerts';
import Head from 'next/head';
import Link from 'next/link';
import { getCouponById } from '@/services/commercialApi';
import { useRouter } from 'next/router';

const ValidatePage = () => {
  const router = useRouter();

  const { coupon } = router.query;
  const [open, setOpen] = useState<boolean>(false);
  const [alertOptions, setAlertOptions] = useState<{
    type: 'success' | 'error' | 'confirm' | 'info';
    message: string;
  }>({
    type: 'success',
    message: 'Cupón validado correctamente',
  });

  useEffect(() => {
    if (coupon) {
      getCouponById(coupon as string)
        .then((data) => {
          if (data.startDate > new Date()) {
            setAlertOptions({
              type: 'error',
              message: 'El cupón no está activo',
            });
          } else if (data.endDate < new Date()) {
            setAlertOptions({
              type: 'error',
              message: 'El cupón ya ha expirado',
            });
          } else {
            setAlertOptions({
              type: 'success',
              message: 'El cupón se encuentra activo',
            });
          }
        })
        .catch(() => {
          setAlertOptions({
            type: 'error',
            message: 'El cupón no existe o ya ha sido canjeado',
          });
        })
        .finally(() => {
          setOpen(true);
        });
    }
  }, [coupon]);

  return (
    <>
      <Head>
        <title>Cupones</title>
        <meta name='description' content='Cupones' />
      </Head>
      <header>
        <nav className='flex justify-between items-center h-16 px-8 bg-blue-500 text-white'>
          <section className='brand'>
            <Link href='./'>
              <h1 className='text-4xl font-bold'>SSMU</h1>
            </Link>
          </section>
          <section>
            <a href='./admin-profile'>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className='rounded-full'
                  src='https://ui-avatars.com/api/?name=Admin'
                  alt='Imagen de administrador'
                  width={44}
                  height={44}
                />
              }
            </a>
          </section>
        </nav>
      </header>
      <main className='w-full min-h-[calc(100vh_-_64px)] flex flex-col justify-center items-center'>
        <Alert severity={alertOptions.type} open={open} setOpen={setOpen}>
          {alertOptions.message}
        </Alert>
        <section className='bg-white p-8 rounded-xl border-4 shadow-lg w-2/3 max-w-[720px] max-h-[90%] backdrop:bg-gray-800 flex flex-col items-center overflow-auto'>
          <form
            action=''
            className='w-full flex flex-col gap-4 items-center justify-center'
          >
            <h1 className='text-3xl text-blue-500 font-bold'>
              Validación de cupones
            </h1>
            <label htmlFor='coupon' className='self-start'>
              Código de cupón
            </label>
            <input
              id='coupon'
              name='coupon'
              type='text'
              placeholder='Código de cupón'
              className='bg-gray-200 p-4 rounded-lg text-xl w-full'
              minLength={4}
              maxLength={16}
              required
            />
            <button
              type='submit'
              className='text-lg font-semibold rounded-lg py-2 px-4 border-4 border-blue-500 text-blue-500 max-w-[300px] w-full'
            >
              Validar
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default ValidatePage;
