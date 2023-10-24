import { DiscountsTable } from '@/components/CommercialTable';
import { CreateDiscountModal } from '@/components/CreateModal';
import { EditDiscountModal } from '@/components/EditModal';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

type discount = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  discountPercentage: number;
  maxDiscount: number;
  discountValue: number;
  minValue: number;
  city: string;
  status: string;
  userType: string;
  familyProfile: string;
};

const Discounts = () => {
  const [discounts, setDiscounts] = useState([
    {
      id: '1',
      name: 'Recorrido Amor y Amistad',
      description:
        'Recorrido por los lugares más emblemáticos de la ciudad de Bogotá',
      startDate: new Date('20 Oct 2021'),
      endDate: new Date('20 Oct 2023'),
      discountPercentage: 0,
      maxDiscount: 1000,
      discountValue: 100,
      minValue: 1000,
      city: 'Bogotá',
      status: 'activo',
      userType: 'frecuente',
      familyProfile: '',
    },
    {
      id: '2',
      name: 'Mi primer viaje',
      description:
        'Recorrido por los lugares más emblemáticos de la ciudad de Bogotá',
      startDate: new Date('20 Oct 2021'),
      endDate: new Date('20 Oct 2023'),
      discountPercentage: 10,
      maxDiscount: 1000,
      discountValue: 0,
      minValue: 1000,
      city: 'Bogotá',
      status: 'activo',
      userType: 'frecuente',
      familyProfile: '',
    },
  ]);

  const [idDiscountToEdit, setIdDiscountToEdit] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleCreate = (formContext: HTMLFormElement | null) => {
    if (formContext) {
      const formData = new FormData(formContext);
      const data = Object.fromEntries(formData.entries());
      const id = discounts.length + 1;

      const newDiscount = {
        id: id.toString(),
        name: data.name as string,
        endDate: new Date(data.endDate.toString()),
        startDate: new Date(data.startDate.toString()),
        description: data.description as string,
        discountPercentage: parseInt(data.discountPercentage as string),
        maxDiscount: 0,
        discountValue: parseInt(data.discountValue as string),
        minValue: 0,
        city: data.city as string,
        status: 'inactivo',
        userType: data.userType as string,
        familyProfile: data.familyProfile as string,
      };

      setDiscounts([...discounts, newDiscount]);

      return true;
    }

    return false;
  };

  const handleEdit = (id: string, formContext: HTMLFormElement | null) => {
    if (formContext) {
      const formData = new FormData(formContext);
      const data = Object.fromEntries(formData.entries());

      const newDiscount = {
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
        userType: data.userType as string,
        familyProfile: data.familyProfile as string,
      };

      const index = discounts.findIndex((discount) => discount.id === id);
      const newDiscounts = [...discounts];
      newDiscounts[index] = {
        ...newDiscount,
        status: newDiscounts[index].status,
      };

      setDiscounts(newDiscounts);

      return true;
    }

    return false;
  };

  const CITY_OPTIONS = [
    { id: '1', name: 'Bogotá' },
    { id: '2', name: 'Medellín' },
    { id: '3', name: 'Cali' },
  ];

  const USER_TYPE_OPTIONS = [
    { id: '1', name: 'Frecuente' },
    { id: '2', name: 'Ocasional' },
    { id: '3', name: 'Nuevo' },
  ];

  return (
    <>
      <Head>
        <title>Promociones</title>
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
            <li
              className={`px-4 py-1 rounded-full font-semibold bg-blue-500 text-white`}
            >
              <Link href='../discounts'>&#8226; Promociones</Link>
            </li>
            <li className={`px-4 py-1 rounded-full font-semibold`}>
              <Link href='../coupons'>&#8226; Cupones</Link>
            </li>
          </ul>
        </aside>

        <section className='col-span-5 mx-16 my-8 px-16 py-8 bg-white rounded-xl overflow-y-auto'>
          <header className='flex justify-between items-center'>
            <div>
              <h1 className='text-4xl font-semibold text-blue-500'>
                Promociones
              </h1>
            </div>
            <div>
              <button
                onClick={() => {
                  setOpenCreateModal(true);
                }}
                className='text-lg text-blue-500 border-4 border-blue-500 px-2 py-1 rounded-lg'
              >
                Nueva promoción +
              </button>
            </div>
          </header>

          <main className='my-8 min-h-[80%]'>
            <DiscountsTable
              elements={discounts}
              setIdCouponToEdit={setIdDiscountToEdit}
              setOpenEdit={setOpenEditModal}
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

        <CreateDiscountModal
          open={openCreateModal}
          setOpen={setOpenCreateModal}
          handleCreate={handleCreate}
          regionOptions={CITY_OPTIONS}
          userTypeOptions={USER_TYPE_OPTIONS}
        />
        {idDiscountToEdit && (
          <EditDiscountModal
            open={openEditModal}
            setOpen={setOpenEditModal}
            handleEdit={handleEdit}
            regionOptions={CITY_OPTIONS}
            userTypeOptions={USER_TYPE_OPTIONS}
            data={
              discounts.find(
                (discount) => discount.id === idDiscountToEdit
              ) as discount
            }
          />
        )}
      </main>
    </>
  );
};

export default Discounts;
