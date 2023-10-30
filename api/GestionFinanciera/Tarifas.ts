/* eslint-disable no-console */
import { CityFeeRequest } from '@/interfaces/CityFee.interface';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000,
});

const obtenerTarifasPorCiudad = () => {
  return api.get('/cities/names');
};

const actualizarTarifaPorCiudad = (request: CityFeeRequest) => {
  return api.put(`/cities/${request.cityId}/percentage`, {
    newPercentage: request.percentage,
  });
};

export { obtenerTarifasPorCiudad, actualizarTarifaPorCiudad };
