/* eslint-disable no-restricted-imports */
import { Complain, Grievance, TypePqrs } from '../types/Enum.types';
import { createPqrsType } from '../types/createPqrs.types';

export const getFormatPqrs = (
  tipoPQRS: TypePqrs,
  tipoSubPqrs: Complain | Grievance
): createPqrsType => {
  const formData: createPqrsType = {
    tipoPqrs: tipoPQRS,
    creadoPor: 0,
    quejaHacia: 0,
    creadoPorRol: 'string',
    estadoPqrs: 'Pendiente',
    admin: 0,
    fechaCreacion: new Date(),
    estadoAprobacion: 'Indefinido',
    descripcionPqrs: '',
  };
  if (tipoPQRS === 'Queja') {
    formData.tipoQueja = tipoSubPqrs?.replace(/\s/g, '') as Complain;
  }
  if (tipoPQRS === 'Reclamo') {
    formData.tipoReclamo = tipoSubPqrs?.replace(/\s/g, '') as Grievance;
  }
  return formData;
};
