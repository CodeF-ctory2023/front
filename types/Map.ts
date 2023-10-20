export interface MarkerType {
  id: string;
  lat: number;
  long: number;
  icon: string;
  type: string;
}

export enum MarkerTypes {
  USER = 'user',
  DRIVER = 'driver',
  DESTINATION = 'destination',
}

export type NearbyDrivers = {
  showCircle: boolean;
  coords: number[];
  radius: number;
};
