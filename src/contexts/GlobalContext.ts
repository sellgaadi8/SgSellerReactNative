import React from 'react';
import {AppContext} from '../types/context';

const GlobalContext = React.createContext<AppContext>({
  setAuthenticated: () => {},
  setName: () => {},
  name: '',
  vehicleId: '',
  setVehicleId: () => {},
  vehicleType: '4_wheeler',
  setVehicleType: () => {},
});

export default GlobalContext;
