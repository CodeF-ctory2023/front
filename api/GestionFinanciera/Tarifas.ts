/* eslint-disable no-console */
import {
  CityFeeRequest,
  CityFeeResponse,
} from '@/interfaces/CityFee.interface';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000,
});

const obtenerTarifasPorCiudad = async (): Promise<CityFeeResponse> => {
  try {
    const res = await api.get('/cities/names');
    return res.data;
  } catch (error) {
    throw new Error('Ha ocurrido un error', {
      cause: error,
    });
  }
};

const actualizarTarifaPorCiudad = (request: CityFeeRequest) => {
  return api.put(`/cities/${request.cityId}/percentage`, {
    newPercentage: request.percentage,
  });
};

export { obtenerTarifasPorCiudad, actualizarTarifaPorCiudad };
