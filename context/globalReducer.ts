import { Action, MarkerType, ReducerActions, State } from '@/types';

export const globalReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ReducerActions.ADD:
      return {
        ...state,
        markers: [...state.markers, action.payload],
      };
    case ReducerActions.REMOVE:
      return {
        ...state,
        markers: state.markers.filter((marker: MarkerType) => {
          if (!(marker.id === action.payload)) return marker;
        }),
      };
    case ReducerActions.SEARCH:
      return {
        ...state,
        nearbyDrivers: {
          showCircle: action.payload.showCircle,
          coords: action.payload.coords,
          radius: action.payload.radius,
        },
      };
    default:
      return state;
  }
};
