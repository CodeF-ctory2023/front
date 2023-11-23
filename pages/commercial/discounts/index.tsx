import {
  TDiscountPayload,
  TNewDiscountPayload,
} from '@/services/commercialApi/types';
import {
  createDiscount,
  deleteDiscount,
  getDiscounts,
  updateDiscount,
} from '@/services/commercialApi/discounts';

import { Alert } from '@/components/commercialComponents/alerts';
import { COMMERCIAL_CONSTANTS } from '@/constants/commercial';
import { CreateDiscountModal } from '@/components/commercialComponents/CreateModal';
import { DiscountsTable } from '@/components/commercialComponents/CommercialTable';
import { EditDiscountModal } from '@/components/commercialComponents/EditModal';
import Head from 'next/head';
import Link from 'next/link';
import { TDiscount } from '@/types';
import { useDelete } from '@/hooks/useDelete';
import { useFetch } from '@/hooks/useFetch';
import { useState } from 'react';

const CITY_OPTIONS = COMMERCIAL_CONSTANTS.regions;
const USER_TYPE_OPTIONS = COMMERCIAL_CONSTANTS.userTypes;

const Discounts = () => {
  const { data: discounts, setData: setDiscounts } = useFetch<TDiscount[]>(
    getDiscounts,
    []
  );

  const [idDiscountToEdit, setIdDiscountToEdit] = useState('');

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertOptions, setAlertOptions] = useState<{
    severity: 'success' | 'error' | 'info' | 'confirm';
    message: string;
  }>({
    severity: 'success',
    message: '',
  });

  const handleCreate = async (formContext: HTMLFormElement | null) => {
    if (formContext) {
      const formData = new FormData(formContext);
      const data = Object.fromEntries(formData.entries());
      const startDate = data.startDate.toString().replace('T', ' ') + ':00';
      const endDate = data.endDate.toString().replace('T', ' ') + ':00';

      const newDiscount: TNewDiscountPayload = {
        name: data.name as string,
        endDate,
        startDate,
        description: data.description as string,
        discountPercentage: parseInt(
          (data.discountPercentage as string) || '0'
        ),
        maxDiscount: parseInt((data.maxDiscount as string) || '0'),
        discountValue: parseInt((data.discountValue as string) || '0'),
        minValue: parseInt((data.minValue as string) || '0'),
        isActive: true,
        city: data.city as string,
        userType: data.userType as string,
      };

      try {
        const response = await createDiscount(newDiscount);
        setDiscounts([...(discounts ?? []), response]);
        setAlertOptions({
          severity: 'success',
          message: 'Promoción creada exitosamente',
        });
        setOpenCreateModal(false);
        setOpenAlert(true);
        return true;
      } catch (err) {
        setAlertOptions({
          severity: 'error',
          message: 'Error al crear la promoción',
        });
        setOpenAlert(true);
        return false;
      }
    }

    return false;
  };

  const handleEdit = async (
    id: string,
    formContext: HTMLFormElement | null
  ) => {
    if (formContext) {
      const formData = new FormData(formContext);
      const data = Object.fromEntries(formData.entries());
      const startDate = data.startDate.toString().replace('T', ' ') + ':00';
      const endDate = data.endDate.toString().replace('T', ' ') + ':00';

      const editedDiscount = {
        name: data.name as string,
        endDate,
        startDate,
        description: data.description as string,
        discountPercentage: parseInt(
          (data.discountPercentage as string) || '0'
        ),
        maxDiscount: parseInt((data.maxDiscount as string) || '0'),
        discountValue: parseInt((data.discountValue as string) || '0'),
        minValue: parseInt((data.minValue as string) || '0'),
      };

      try {
        const response = await updateDiscount(
          id,
          editedDiscount as TDiscountPayload
        );
        const newDiscounts = discounts?.map((discount) =>
          discount.id === id ? response : discount
        );
        setDiscounts(newDiscounts ?? []);
        setAlertOptions({
          severity: 'success',
          message: 'Promoción editada exitosamente',
        });
        setOpenEditModal(false);
        setOpenAlert(true);
        return true;
      } catch (error) {
        setAlertOptions({
          severity: 'error',
          message: 'Error al editar la promoción',
        });
        setOpenAlert(true);
        return false;
      }
    }

    return false;
  };

  const { setIdToDelete: setIdDiscountToDelete, setDeleteConfirm } =
    useDelete<TDiscount>(
      discounts,
      setDiscounts,
      setAlertOptions,
      setOpenAlert,
      'discount',
      deleteDiscount
    );

  return (
    <>
      <Head>
        <title>Promociones</title>
        <meta name='description' content='Cupones' />
      </Head>
      <header>
        <nav className='flex justify-between items-center h-16 px-8 bg-blue-500 text-white'>
          <section className='brand'>
            <Link href='./coupons'>
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
      <main className='2xl:grid-cols-6 md:grid grid-cols-7 gap-4 min-h-[calc(100vh_-_64px)] bg-gray-50'>
        <aside className='2xl:col-span-1 md:col-span-2 p-8 bg-blue-50 '>
          <h2 className='text-xl font-semibold'>Marketing</h2>
          <ul className='py-4'>
            <li
              className={`px-4 py-1 rounded-full font-semibold bg-blue-500 text-white`}
            >
              <Link href='../commercial/discounts'>&#8226; Promociones</Link>
            </li>
            <li className={`px-4 py-1 rounded-full font-semibold`}>
              <Link href='../commercial/coupons'>&#8226; Cupones</Link>
            </li>
            <li className={`px-4 py-1 rounded-full font-semibold`}>
              <Link href='../commercial/coupons/validate'>&#8226; Validar</Link>
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
              elements={discounts ?? []}
              setIdToEdit={setIdDiscountToEdit}
              setOpenEdit={setOpenEditModal}
              setIdToDelete={setIdDiscountToDelete}
            />
          </main>
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
            setIdToEdit={setIdDiscountToEdit}
            handleEdit={handleEdit}
            regionOptions={CITY_OPTIONS}
            userTypeOptions={USER_TYPE_OPTIONS}
            data={
              discounts?.find(
                (discount) => discount.id === idDiscountToEdit
              ) as TDiscount
            }
          />
        )}
        <Alert
          severity={alertOptions.severity}
          open={openAlert}
          setOpen={setOpenAlert}
          setConfirm={setDeleteConfirm}
        >
          <p>{alertOptions.message}</p>
        </Alert>
      </main>
    </>
  );
};

export default Discounts;
