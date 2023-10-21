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

export const HEADINGS = ['Tipo de PQRS', 'Fecha', 'Estado', 'Contenido', 'Opciones'];

export const NAVFILTER = ['Todas', 'Pendientes', 'Resueltas', 'Rechazadas'];