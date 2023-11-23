import axios from 'axios';
import { Solicitude } from '../interfaces/solicitude';
const API_BASE_URL = 'http://localhost:8001';

export const getSolicitudes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/solicitudes`);
      return response.data.solicitudes;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
  
export const deleteSolicitude = async (driverSolicitudeId:string) => {
    try {
        await axios.delete(`${API_BASE_URL}/solicitude/${driverSolicitudeId}`);
        console.log("Solicitude deleted");
    } catch (error) {
        console.error(error);
        throw error;
    }
};


