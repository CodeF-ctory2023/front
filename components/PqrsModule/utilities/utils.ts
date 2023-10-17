import { getClaimOptions } from '@/components/PqrsModule/services/getClaimOptions';
import { getComplaintOptions } from '@/components/PqrsModule/services/getComplaintOptions';
import { getPqrsOptions } from '@/components/PqrsModule/services/getPqrsOptions';

export const usePqrsOptions = () => {
    return {
      pqrsOptions: getPqrsOptions(),
      claimOptions: getClaimOptions(),
      complaintOptions: getComplaintOptions(),
    };
  }

