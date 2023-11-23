import axios from 'axios';
import { DriverSolicitude } from '../interfaces/driverSolicitude';

const API_BASE_URL = 'http://localhost:8001';

export const sendDriverSolicitudeData = async (solicitudeData: DriverSolicitude) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/driver`, solicitudeData);
    return response.data;
  } catch (error) {
        console.log(error);
    throw error;
  }
};
