import { PqrsApi } from '@/api/PqrsApi';
import { StatePqrs } from '@/components/PqrsModule/types/Enum.types';
import { createPqrsType } from '@/components/PqrsModule/types/createPqrs.types';
import { pqrsType } from '@/components/PqrsModule/utilities';
import Swal from 'sweetalert2';

export const usePqrs = () => {
  const getPqrs = async () => {
    try {
      const { data } = await PqrsApi.get<pqrsType[]>('/pqrs');
      return data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const createPqrs = async (data: createPqrsType) => {
    try {
      await PqrsApi.post('/pqrs', data);
      Swal.fire({
        icon: 'success',
        title: 'PQRS created successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const deletePqrs = async (id: number) => {
    try {
      await PqrsApi.delete(`/pqrs/${id}`);
      Swal.fire({
        icon: 'success',
        title: 'PQRS deleted successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const updatePqrsState = async (id: number, state: StatePqrs) => {
    try {
      await PqrsApi.put(`/pqrs/${id}/${state}`);
      Swal.fire({
        icon: 'success',
        title: 'PQRS updated successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  }

  return {
    getPqrs,
    createPqrs,
    deletePqrs,
    updatePqrsState,
  };
};
