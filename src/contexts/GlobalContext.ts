import React from 'react';

const GlobalContext = React.createContext<AppContext>({
  setAuthenticated: () => {},
  setName: () => {},
  name: '',
  vehicleId: '',
  setVehicleId: () => {},
  vehicleType: '',
  setVehicleType: () => {},
});

export default GlobalContext;
