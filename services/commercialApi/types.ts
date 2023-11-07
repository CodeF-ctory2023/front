export type TCouponPayload = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  discountPercentage: number;
  maxDiscount: number;
  discountValue: number;
  minValue: number;
  amount: number;
  city: string;
  amountAvailable: number;
  status: string;
};
