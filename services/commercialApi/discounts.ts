import { TDiscountPayload, TNewDiscountPayload } from './types';

import { adaptDiscount } from './adapters/discounts';
import { service } from './service';

export const getDiscounts = async () => {
  try {
    const discounts: TDiscountPayload[] = await service.get('discounts/all');

    return discounts.map((discount) => adaptDiscount(discount));
  } catch (error) {
    throw new Error('Error al obtener las promociones');
  }
};

export const getDiscountById = async (id: string) => {
  try {
    const discount: TDiscountPayload = await service.get(`discounts/${id}`);
    return adaptDiscount(discount);
  } catch (error) {
    throw new Error('Error al obtener la promoción');
  }
};

export const createDiscount = async (discount: TNewDiscountPayload) => {
  try {
    const newDiscount: TDiscountPayload = await service.post(
      'discounts/create',
      discount
    );
    return adaptDiscount(newDiscount);
  } catch (error) {
    throw new Error('Error al crear la promoción');
  }
};

export const updateDiscount = async (
  id: string,
  discount: TDiscountPayload
) => {
  try {
    const updatedDiscount: TDiscountPayload = await service.patch(
      `discounts/edit/${id}`,
      discount
    );
    return adaptDiscount(updatedDiscount);
  } catch (error) {
    throw new Error('Error al actualizar la promoción');
  }
};

export const deleteDiscount = async (id: string) => {
  try {
    await service.delete(`discounts/delete/${id}`);
  } catch (error) {
    throw new Error('Error al eliminar la promoción');
  }
};
