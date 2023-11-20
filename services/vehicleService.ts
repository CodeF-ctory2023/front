import axios from 'axios';
import { VehicleModel } from '../interfaces/vehicleModel';

const API_BASE_URL = 'api';

export const sendVehicleData = async (vehicleData: VehicleModel) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/vehicles`, vehicleData);
    return response.data;
  } catch (error) {
        console.log(error);
    throw error;
  }
};