import { getClaimOptions } from '@/components/PqrsModule/services/getGrievanceOptions';
import { getComplaintOptions } from '@/components/PqrsModule/services/getComplaintOptions';
import { getPqrsOptions } from '@/components/PqrsModule/services/getPqrsOptions';

export const usePqrsOptions = () => {
    return {
      pqrsOptions: getPqrsOptions(),
      claimOptions: getClaimOptions(),
      complaintOptions: getComplaintOptions(),
    };
  }

export const HEADINGS = ['Descripción', 'Tipo', 'Fecha', 'Estado', 'Opciones'];

export const NAVFILTER = ['Todas', 'Pendientes', 'Resueltas', 'Rechazadas'];