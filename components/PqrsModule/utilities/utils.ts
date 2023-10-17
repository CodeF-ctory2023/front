import { getClaimOptions } from '../services/getClaimOptions';
import { getComplaintOptions } from '../services/getComplaintOptions';
import { getPqrsOptions } from '../services/getPqrsOptions';

export function usePqrsOptions() {
    return {
      pqrsOptions: getPqrsOptions(),
      claimOptions: getClaimOptions(),
      complaintOptions: getComplaintOptions(),
    };
  }