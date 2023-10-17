import { CouponsTable } from '@/components/CommercialTable';

const coupons = () => {
  const couponsList = [
    {
      id: '12XSD',
      name: 'Cupón 1',
      amount: 100,
      amountAvailable: 50,
      endDate: '15 de Oct de 2023',
    },
    {
      id: '1IXSD',
      name: 'Cupón 2',
      amount: 100,
      amountAvailable: 50,
      endDate: '15 de Oct de 2023',
    },
  ];

  return (
    <>
      <h1>Cupones Disponibles</h1>
      <CouponsTable couponsList={couponsList} />
    </>
  );
};

export default coupons;
