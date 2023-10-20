import { MarkerType, NearbyDrivers } from './Map';

export type State = {
  markers: MarkerType[];
  nearbyDrivers: NearbyDrivers;
};

export enum ReducerActions {
  ADD = 'ADD_MARKER',
  REMOVE = 'REMOVE_MARKER',
  SEARCH = 'SEARCH_DRIVERS',
}

export type Action =
  | { type: ReducerActions.ADD; payload: MarkerType }
  | { type: ReducerActions.REMOVE; payload: string }
  | { type: ReducerActions.SEARCH; payload: NearbyDrivers };

export interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}
