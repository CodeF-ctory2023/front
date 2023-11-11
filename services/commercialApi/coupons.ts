import { TCouponPayload, TNewCouponPayload } from './types';

import { adaptCoupon } from './adapters/coupons';
import { service } from './service';

export const getCoupons = async () => {
  try {
    const coupons: TCouponPayload[] = await service.get('coupons/all');

    return coupons.map((coupon) => adaptCoupon(coupon));
  } catch (error) {
    throw new Error('Error al obtener los cupones');
  }
};

export const getCouponById = async (id: string) => {
  try {
    const coupon: TCouponPayload = await service.get(`coupons/${id}`);
    return adaptCoupon(coupon);
  } catch (error) {
    throw new Error('Error al obtener el cupón');
  }
};

export const createCoupon = async (coupon: TNewCouponPayload) => {
  try {
    const newCoupon: TCouponPayload = await service.post('coupons', coupon);
    return adaptCoupon(newCoupon);
  } catch (error) {
    throw new Error('Error al crear el cupón');
  }
};

export const updateCoupon = async (id: string, coupon: TCouponPayload) => {
  try {
    const updatedCoupon: TCouponPayload = await service.patch(
      `coupons/${id}`,
      coupon
    );
    return adaptCoupon(updatedCoupon);
  } catch (error) {
    throw new Error('Error al actualizar el cupón');
  }
};

export const deleteCoupon = async (id: string) => {
  try {
    const deletedCoupon: TCouponPayload = await service.delete(`coupons/${id}`);
    return adaptCoupon(deletedCoupon);
  } catch (error) {
    throw new Error('Error al eliminar el cupón');
  }
};
