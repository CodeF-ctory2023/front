import { TDiscount } from '@/types';
import type { TDiscountPayload } from '@/services/commercialApi/types';

export const adaptDiscount = (discount: TDiscountPayload): TDiscount => {
  return {
    id: discount.idStrategy.toString(),
    name: discount.name,
    description: discount.description,
    startDate: new Date(discount.startDate),
    endDate: new Date(discount.endDate),
    discountPercentage: discount.discountPercentage,
    maxDiscount: discount.maxDiscount,
    discountValue: discount.discountValue,
    minValue: discount.minValue,
    city: discount.city,
    userType: discount.userType,
    status: discount.isActive ? 'Activo' : 'Inactivo',
  };
};
