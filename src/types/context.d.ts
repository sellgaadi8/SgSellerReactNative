type AppContext = {
  setAuthenticated: (value: boolean) => void;
  setName: (value: string) => void;
  name: string;
  vehicleId: string;
  setVehicleId: (value: string) => void;
};
