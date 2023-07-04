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
  AddVehicle: {from?: 'edit' | 'add'};
  DisplayInfo: {from?: 'edit' | 'add'};
  CarImages: {from: 'edit' | 'add'};
  CarDocuments: {from: 'edit' | 'add'};
  Exterior: {from: 'edit' | 'add'};
  ExternelPanel: {from: 'edit' | 'add'};
  Tyres: {from: 'edit' | 'add'};
  Engine: {from: 'edit' | 'add'};
  Electricals: {from: 'edit' | 'add'};
  Steering: {from: 'edit' | 'add'};
  HandlingSuspension: {from: 'edit' | 'add'};
  TwoWheelerExterior: {from: 'edit' | 'add'};
  TwoWheelerElectrical: {from: 'edit' | 'add'};
  VehicleDetail: {title: string; vehicleId: string};
  DetailsViewPage: undefined;
  ImageViewerCarousel: {
    onRemoveImage?: (index: number) => void;
    updateImages?: (data: string) => void;
    data: {key: string; value: string}[];
    index: number;
  };
  VideoPlayer: {data: string};
};

type BottomStackParamList = {
  HomeStack: undefined;
  VehicleStack: undefined;
  ProfileStack: undefined;
  ValuatorStack: undefined;
};
