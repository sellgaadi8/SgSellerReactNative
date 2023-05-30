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
  DisplayInfo: {from: 'edit' | 'add'};
  CarImages: {from: 'edit' | 'add'};
  CarDocuments: undefined;
  Exterior: undefined;
  ExternelPanel: undefined;
  Tyres: undefined;
  Engine: undefined;
  Electricals: undefined;
  Steering: undefined;
  Ac: undefined;
};

type BottomStackParamList = {
  HomeStack: undefined;
  VehicleStack: undefined;
  ProfileStack: undefined;
  ValuatorStack: undefined;
};
