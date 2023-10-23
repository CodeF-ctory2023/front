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
  startDate: string;
  endDate: string;
  status: string;
};

interface CouponsTableProps {
  couponsList: coupon[];
  setOpenEdit: Dispatch<React.SetStateAction<boolean>>;
  setIdCouponToEdit: Dispatch<React.SetStateAction<string>>;
}

interface DiscountsTableProps {
  discountsList: discounts[];
}

const DiscountsTable = ({ discountsList }: DiscountsTableProps) => {
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
              <td>{startDate}</td>
              <td>{endDate}</td>
              <td>{status}</td>
              <td>
                <button title='Editar' className='p-1'>
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
  couponsList,
  setOpenEdit,
  setIdCouponToEdit,
}: CouponsTableProps) => {
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
