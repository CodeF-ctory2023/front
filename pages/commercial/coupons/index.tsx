import {
  TCouponPayload,
  TNewCouponPayload,
} from '@/services/commercialApi/types';
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
  updateCoupon,
} from '@/services/commercialApi';

import { Alert } from '@/components/commercialComponents/alerts';
import { COMMERCIAL_CONSTANTS } from '@/constants/commercial';
import { CouponsTable } from '@/components/commercialComponents/CommercialTable';
import { CreateCouponModal } from '@/components/commercialComponents/CreateModal';
import { EditCouponModal } from '@/components/commercialComponents/EditModal';
import Head from 'next/head';
import Link from 'next/link';
import { TCoupon } from '@/types';
import { useDelete } from '@/hooks/useDelete';
import { useFetch } from '@/hooks/useFetch';
import { useState } from 'react';

const CITY_OPTIONS = COMMERCIAL_CONSTANTS.regions;
const USER_TYPE_OPTIONS = COMMERCIAL_CONSTANTS.userTypes;

const Coupons = () => {
  const { data: coupons, setData: setCoupons } = useFetch<TCoupon[]>(
    getCoupons,
    []
  );

  const [idCouponToEdit, setIdCouponToEdit] = useState('');

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

      const newCoupon: TNewCouponPayload = {
        amountCreated: parseInt(data.amount as string),
        strategy: {
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
          city: data.city as string,
          userType: data.userType as string,
          isActive: true,
        },
      };

      try {
        const response = await createCoupon(newCoupon);
        setCoupons([...(coupons ?? []), response]);
        setAlertOptions({
          severity: 'success',
          message: 'Cupón creado exitosamente',
        });
        setOpenCreateModal(false);
        setOpenAlert(true);
        return true;
      } catch (err) {
        setAlertOptions({
          severity: 'error',
          message: 'Error al crear el cupón',
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
      const editedCoupon = {
        strategy: {
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
        },
      };

      try {
        const response = await updateCoupon(id, editedCoupon as TCouponPayload);
        const newCoupons = coupons?.map((coupon) =>
          coupon.id === id ? response : coupon
        );
        setCoupons(newCoupons ?? []);
        setAlertOptions({
          severity: 'success',
          message: 'Cupón editado exitosamente',
        });
        setOpenEditModal(false);
        setOpenAlert(true);
        return true;
      } catch (error) {
        setAlertOptions({
          severity: 'error',
          message: 'Error al editar el cupón',
        });
        setOpenAlert(true);
        return false;
      }
    }
    return false;
  };

  const { setIdToDelete: setIdCouponToDelete, setDeleteConfirm } =
    useDelete<TCoupon>(
      coupons,
      setCoupons,
      setAlertOptions,
      setOpenAlert,
      'coupon',
      deleteCoupon
    );

  return (
    <>
      <Head>
        <title>Cupones</title>
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
            <li className={`px-4 py-1 rounded-full font-semibold`}>
              <Link href='../commercial/discounts'>&#8226; Promociones</Link>
            </li>
            <li
              className={`px-4 py-1 rounded-full font-semibold bg-blue-500 text-white`}
            >
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
              elements={coupons ?? []}
              setOpenEdit={setOpenEditModal}
              setIdToEdit={setIdCouponToEdit}
              setIdToDelete={setIdCouponToDelete}
            />
          </main>
        </section>

        <CreateCouponModal
          open={openCreateModal}
          setOpen={setOpenCreateModal}
          handleCreate={handleCreate}
          regionOptions={CITY_OPTIONS}
          userTypeOptions={USER_TYPE_OPTIONS}
        />
        {idCouponToEdit && (
          <EditCouponModal
            open={openEditModal}
            setOpen={setOpenEditModal}
            setIdToEdit={setIdCouponToEdit}
            data={
              coupons?.find((coupon) => coupon.id === idCouponToEdit) as TCoupon
            }
            handleEdit={handleEdit}
            regionOptions={CITY_OPTIONS}
            userTypeOptions={USER_TYPE_OPTIONS}
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

export default Coupons;
