import React from 'react';

const GlobalContext = React.createContext<AppContext>({
  setAuthenticated: () => {},
  setName: () => {},
  name: '',
  vehicleId: '',
  video1: '',
  setVehicleId: () => {},
  setVideo1: () => {},
  video2: '',
  setVideo2: () => {},
});

export default GlobalContext;
