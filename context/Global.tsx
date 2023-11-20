import { ContextProps, State } from '@/types';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { globalReducer } from './globalReducer';
import { drivers } from '@/data/drivers';

const initialState: State = {
  markers: [],
  nearbyDrivers: {
    showCircle: false,
    coords: [0, 0],
    radius: 0,
  },
  services: [],
  activeService: {
    activeService: false,
    driverCoords: [],
  },
  drivers: [],
};

const init = () => {
  return {
    ...initialState,
    markers: drivers.map((driver) => driver),
    drivers: drivers.map((driver) => {
      return {
        id: driver.id,
        coords: [driver.lat, driver.long],
      };
    }),
  };
};

const GlobalContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {},
});

const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalReducer, {}, init);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContextProvider, useGlobalContext };
