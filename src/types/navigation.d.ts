type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  CreatePassword: undefined;
  ForgotPassword: undefined;
  BottomNavigation: undefined;
  HomeStack: undefined;
  Profile: undefined;
  ProfileDetails: {title: string};
  ValuatorForm: {title: string; list: Valuators};
  ValuatorStack: undefined;
  Vehicles: undefined;
  AddVehicle: {from: 'edit' | 'add'};
  DisplayInfo: undefined;
  CarDocuments: undefined;
  Exterior: undefined;
  ExternelPanel: undefined;
  CarImages: undefined;
};

type BottomStackParamList = {
  HomeStack: undefined;
  VehicleStack: undefined;
  ProfileStack: undefined;
  ValuatorStack: undefined;
};
