import { Service } from './Service';
import { MarkerType, NearbyDrivers } from './Map';

export type State = {
  markers: MarkerType[];
  nearbyDrivers: NearbyDrivers;
  services: Service[];
};

export enum ReducerActions {
  ADD = 'ADD_MARKER',
  REMOVE = 'REMOVE_MARKER',
  SEARCH = 'SEARCH_DRIVERS',
  ADD_SERVICE = 'ADD_SERVICE',
  REMOVE_SERVICE = 'REMOVE_SERVICE',
}

export type Action =
  | { type: ReducerActions.ADD; payload: MarkerType }
  | { type: ReducerActions.REMOVE; payload: string }
  | { type: ReducerActions.SEARCH; payload: NearbyDrivers }
  | { type: ReducerActions.ADD_SERVICE; payload: Service }
  | { type: ReducerActions.REMOVE_SERVICE; payload: string };

export interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}
