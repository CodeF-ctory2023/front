import type { TCoupon } from '@/types';
import type { TCouponPayload } from '@/services/commercialApi/types';

export const adaptCoupon = (coupon: TCouponPayload): TCoupon => {
  return {
    id: coupon.id,
    name: coupon.name,
    description: coupon.description,
    startDate: new Date(coupon.startDate),
    endDate: new Date(coupon.endDate),
    discountPercentage: coupon.discountPercentage,
    maxDiscount: coupon.maxDiscount,
    discountValue: coupon.discountValue,
    minValue: coupon.minValue,
    amount: coupon.amount,
    city: coupon.city,
    amountAvailable: coupon.amountAvailable,
    status: coupon.status,
  };
};
