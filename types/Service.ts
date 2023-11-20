export interface Service {
  serviceId?: string;
  activeService?: boolean;
  locationName: string;
  destinationName: string;
}

export interface ActiveService {
  activeService: boolean;
  driverCoords: number[];
}
