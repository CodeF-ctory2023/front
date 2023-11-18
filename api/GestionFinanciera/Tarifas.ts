import {
  CityFeeRequest,
  CityFeeResponse,
} from '@/interfaces/CityFee.interface';
import { NonStopFee } from '@/interfaces/NonStopFee.interfaces';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000,
});

const obtenerTarifasPorCiudad = async (): Promise<CityFeeResponse> => {
  return api
    .get('/cities/names')
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      if (res.status === 400) {
        throw new Error(res.data);
      }
    })
    .catch((err) => {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else {
        throw new Error('Error al conectar con el servidor, intente más tarde');
      }
    });
};

const actualizarTarifaPorCiudad = (request: CityFeeRequest) => {
  return api.put(`/cities/${request.cityId}/percentage`, {
    newPercentage: request.percentage,
  });
};

const crearTarifaDeTransporte = async (req: NonStopFee) => {
  return api
    .post('/rates/transportation', req)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      if (res.status === 400) {
        throw new Error(res.data);
      }
    })
    .catch((err) => {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else {
        throw new Error('Error al conectar con el servidor, intente más tarde');
      }
    });
};

export {
  actualizarTarifaPorCiudad,
  crearTarifaDeTransporte,
  obtenerTarifasPorCiudad,
};
