import type { TCoupon } from '@/types';
import type { TCouponPayload } from '@/services/commercialApi/types';

export const adaptCoupon = (coupon: TCouponPayload): TCoupon => {
  return {
    id: coupon.code,
    name: coupon.strategy.name,
    description: coupon.strategy.description,
    startDate: new Date(coupon.strategy.startDate),
    endDate: new Date(coupon.strategy.endDate),
    discountPercentage: coupon.strategy.discountPercentage,
    maxDiscount: coupon.strategy.maxDiscount,
    discountValue: coupon.strategy.discountValue,
    minValue: coupon.strategy.minValue,
    amount: coupon.amountCreated,
    city: coupon.strategy.city,
    amountAvailable: coupon.amountCreated,
    status: coupon.status,
    userType: coupon.strategy.userType,
  };
};
