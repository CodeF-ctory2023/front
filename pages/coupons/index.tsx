import { CouponsTable } from '@/components/CommercialTable';
import { CreateCouponModal } from '@/components/CreateModal';
import { EditCouponModal } from '@/components/EditModal';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

type coupon = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  discountPercentage: number;
  maxDiscount: number;
  discountValue: number;
  minValue: number;
  amount: number;
  city: string;
  amountAvailable: number;
  status: string;
};

const Coupons = () => {
  const [coupons, setCoupons] = useState([
    {
      id: '1',
      name: 'Recorrido Amor y Amistad',
      description:
        'Recorrido por los lugares más emblemáticos de la ciudad de Bogotá',
      amount: 100,
      amountAvailable: 10,
      startDate: new Date('20 Oct 2021'),
      endDate: new Date('20 Oct 2023'),
      discountPercentage: 10,
      maxDiscount: 1000,
      discountValue: 100,
      minValue: 1000,
      city: 'Bogotá',
      status: 'activo',
    },
    {
      id: '2',
      name: 'Mi primer viaje',
      description:
        'Recorrido por los lugares más emblemáticos de la ciudad de Bogotá',
      amount: 100,
      amountAvailable: 10,
      startDate: new Date('20 Oct 2021'),
      endDate: new Date('20 Oct 2023'),
      discountPercentage: 10,
      maxDiscount: 1000,
      discountValue: 100,
      minValue: 1000,
      city: 'Bogotá',
      status: 'activo',
    },
  ]);

  const [idCouponToEdit, setIdCouponToEdit] = useState('');

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleCreate = (formContext: HTMLFormElement | null) => {
    if (formContext) {
      const formData = new FormData(formContext);
      const data = Object.fromEntries(formData.entries());
      const id = coupons.length + 1;

      const newCoupon = {
        id: id.toString(),
        name: data.name as string,
        amount: parseInt(data.amount as string),
        amountAvailable: parseInt(data.amount as string),
        endDate: new Date(data.endDate.toString()),
        startDate: new Date(data.startDate.toString()),
        description: data.description as string,
        discountPercentage: parseInt(data.discountPercentage as string),
        maxDiscount: 0,
        discountValue: parseInt(data.discountValue as string),
        minValue: 0,
        city: data.city as string,
        status: 'inactivo',
      };

      setCoupons([...coupons, newCoupon]);

      return true;
    }

    return false;
  };

  const handleEdit = (id: string, formContext: HTMLFormElement | null) => {
    if (formContext) {
      const formData = new FormData(formContext);
      const data = Object.fromEntries(formData.entries());

      const newCoupon = {
        id: id.toString(),
        name: data.name as string,
        amount: parseInt(data.amount as string),
        amountAvailable: parseInt(data.amount as string),
        endDate: new Date(data.endDate.toString()),
        startDate: new Date(data.startDate.toString()),
        description: data.description as string,
        discountPercentage: parseInt(data.discountPercentage as string),
        maxDiscount: 0,
        discountValue: parseInt(data.discountValue as string),
        minValue: 0,
        city: data.city as string,
        status: 'inactivo',
      };

      const index = coupons.findIndex((coupon) => coupon.id === id);
      const newCoupons = [...coupons];
      newCoupons[index] = newCoupon;

      setCoupons(newCoupons);

      return true;
    }

    return false;
  };

  const CITY_OPTIONS = [
    { id: '1', name: 'Bogotá' },
    { id: '2', name: 'Medellín' },
    { id: '3', name: 'Cali' },
  ];

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
          <section className='search'>
            <form action=''>
              <input
                type='text'
                name='search'
                id='search'
                placeholder='Buscar en SSMU'
                className='bg-white px-4 py-2 w-72 rounded-l-lg'
              />
              <button
                type='submit'
                title='Buscar'
                className='bg-white px-4 py-2 rounded-r-lg'
              >
                🔎
              </button>
            </form>
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
      <main className='grid grid-cols-6 gap-4 min-h-[calc(100vh_-_64px)] bg-gray-50'>
        <aside className='col-span-1 p-8 bg-blue-50'>
          <h2 className='text-xl font-semibold'>Marketing</h2>
          <ul className='px-6 py-4'>
            <li className={`px-4 py-1 rounded-full font-semibold`}>
              <Link href='../discounts'>&#8226; Promociones</Link>
            </li>
            <li
              className={`px-4 py-1 rounded-full font-semibold bg-blue-500 text-white`}
            >
              <Link href='../coupons'>&#8226; Cupones</Link>
            </li>
          </ul>
        </aside>

        <section className='col-span-5 mx-16 my-8 px-16 py-8 bg-white rounded-xl overflow-y-auto'>
          <header className='flex justify-between items-center'>
            <div>
              <h1 className='text-4xl font-semibold text-blue-500'>Cupones</h1>
            </div>
            <div>
              <button
                onClick={() => {
                  setOpenCreateModal(true);
                }}
                className='text-lg text-blue-500 border-4 border-blue-500 px-2 py-1 rounded-lg'
              >
                Nuevo Cupón +
              </button>
            </div>
          </header>

          <main className='my-8 min-h-[80%]'>
            <CouponsTable
              couponsList={coupons}
              setOpenEdit={setOpenEditModal}
              setIdCouponToEdit={setIdCouponToEdit}
            />
          </main>

          <footer className='flex float-right gap-4 font-semibold text-white'>
            <button className='text-2xl text-gray-500'>&lt;</button>
            <ol className='text-lg flex gap-2'>
              <li>
                <button className='bg-gray-500 w-9 h-9 rounded-full'>1</button>
              </li>
              <li>
                <button className='bg-blue-500 w-9 h-9 rounded-full'>2</button>
              </li>
              <li>
                <button className='bg-gray-500 w-9 h-9 rounded-full'>3</button>
              </li>
            </ol>
            <button className='text-2xl text-gray-500'>&gt;</button>
          </footer>
        </section>

        <CreateCouponModal
          open={openCreateModal}
          setOpen={setOpenCreateModal}
          handleCreate={handleCreate}
          regionOptions={CITY_OPTIONS}
        />
        {idCouponToEdit && (
          <EditCouponModal
            open={openEditModal}
            setOpen={setOpenEditModal}
            data={
              coupons.find((coupon) => coupon.id === idCouponToEdit) as coupon
            }
            handleEdit={handleEdit}
            regionOptions={CITY_OPTIONS}
          />
        )}
      </main>
    </>
  );
};

export default Coupons;
