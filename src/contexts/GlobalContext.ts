import React from 'react';

const GlobalContext = React.createContext<AppContext>({
  setAuthenticated: () => {},
  setName: () => {},
  name: '',
  vehicleId: '',
  setVehicleId: () => {},
});

export default GlobalContext;
