import { Dispatch } from 'react';

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

type discounts = {
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
interface TableProps<T> {
  elements: T[];
  setOpenEdit: Dispatch<React.SetStateAction<boolean>>;
  setIdCouponToEdit: Dispatch<React.SetStateAction<string>>;
}

const DiscountsTable = ({
  elements: discountsList,
  setOpenEdit,
  setIdCouponToEdit,
}: TableProps<discounts>) => {
  return (
    <table className='w-full border-collapse table-auto text-center'>
      <thead className='border-b-2 h-12'>
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Fecha de Inicio</th>
          <th>Fecha de Fin</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {discountsList.map(({ id, name, startDate, endDate, status }) => {
          return (
            <tr key={`discount-row-${id}`} className='border-b-2 h-12'>
              <td>{id}</td>
              <td>{name}</td>
              <td>
                {new Intl.DateTimeFormat('es-ES', {
                  dateStyle: 'medium',
                }).format(startDate)}
              </td>
              <td>
                {new Intl.DateTimeFormat('es-ES', {
                  dateStyle: 'medium',
                }).format(endDate)}
              </td>
              <td>
                <span
                  className={`${
                    status === 'activo'
                      ? 'text-green-500 border-green-300 bg-green-100'
                      : 'text-red-500 border-red-300 bg-red-100'
                  } py-1 px-2 border-2 rounded-md capitalize`}
                >
                  {status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setIdCouponToEdit(id);
                  }}
                  title='Editar'
                  className='p-1'
                >
                  ✏️
                </button>
                <button title='Eliminar' className='p-1'>
                  🗑️
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const CouponsTable = ({
  elements: couponsList,
  setOpenEdit,
  setIdCouponToEdit,
}: TableProps<coupon>) => {
  if (couponsList.length === 0)
    return (
      <div className='flex justify-center items-center text-2xl text-gray-500'>
        No hay cupones registrados
      </div>
    );
  return (
    <table className='w-full border-collapse table-auto text-center'>
      <thead className='border-b-2 h-12'>
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Disponibles</th>
          <th>Fecha de Fin</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {couponsList.map(({ id, name, amount, amountAvailable, endDate }) => {
          return (
            <tr key={`coupon-row-${id}`} className='border-b-2 h-12'>
              <td>{id}</td>
              <td>{name}</td>
              <td>
                {amountAvailable}/{amount}
              </td>
              <td>
                {new Intl.DateTimeFormat('es-ES', {
                  dateStyle: 'medium',
                }).format(endDate)}
              </td>
              <td>
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setIdCouponToEdit(id);
                  }}
                  title='Editar'
                  className='p-1'
                >
                  ✏️
                </button>
                <button title='Eliminar' className='p-1'>
                  🗑️
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { DiscountsTable, CouponsTable };
