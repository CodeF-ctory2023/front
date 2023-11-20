import { ActiveService, Service } from './Service';
import { DeletedMarker, DriverCoords, MarkerType, NearbyDrivers } from './Map';

export type State = {
  markers: MarkerType[];
  nearbyDrivers: NearbyDrivers;
  services: Service[];
  activeService: ActiveService;
  drivers: DriverCoords[];
};

export enum ReducerActions {
  ADD = 'ADD_MARKER',
  REMOVE = 'REMOVE_MARKER',
  SEARCH = 'SEARCH_DRIVERS',
  ADD_SERVICE = 'ADD_SERVICE',
  REMOVE_SERVICE = 'REMOVE_SERVICE',
  ADD_DRIVER_COORDS = 'ADD_DRIVER_COORDS',
}

export type Action =
  | { type: ReducerActions.ADD; payload: MarkerType }
  | { type: ReducerActions.REMOVE; payload: DeletedMarker }
  | { type: ReducerActions.SEARCH; payload: NearbyDrivers }
  | { type: ReducerActions.ADD_SERVICE; payload: Service }
  | { type: ReducerActions.REMOVE_SERVICE; payload: string }
  | { type: ReducerActions.ADD_DRIVER_COORDS; payload: DriverCoords };

export interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}
