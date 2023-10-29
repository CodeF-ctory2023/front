/* eslint-disable no-console */
import { CityFeeRequest } from '@/interfaces/CityFee.interface';
import axios from 'axios';

const API_URL = 'http://localhost:8080/ssmu-api/';

const api = axios.create({ baseURL: API_URL, timeout: 3000 });

const obtenerTarifasPorCiudad = () => {
  return api.get('/cities/names');
};

const actualizarTarifaPorCiudad = (request: CityFeeRequest) => {
  return api.put(`/cities/${request.cityId}/percentage`, {
    newPercentage: request.percentage,
  });
};

export { obtenerTarifasPorCiudad, actualizarTarifaPorCiudad };
