import { getClaimOptions } from '../services/getClaimOptions';
import { getComplaintOptions } from '../services/getComplaintOptions';
import { getPqrsOptions } from '../services/getPqrsOptions';

export const usePqrsOptions = () => {
    return {
      pqrsOptions: getPqrsOptions(),
      claimOptions: getClaimOptions(),
      complaintOptions: getComplaintOptions(),
    };
  }

