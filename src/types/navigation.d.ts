type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  CreatePassword: undefined;
  ForgotPassword: undefined;
  BottomNavigation: undefined;
  HomeStack: undefined;
  Profile: undefined;
  ProfileDetails: {title: string};
  ValuatorForm: {title: string; list: Valuators};
  ValuatorStack: undefined;
  Vehicles: undefined;
  AddVehicle: {from?: 'edit' | 'add'; title: string};
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
    data: {
      value: string;
      image: string;
      key: string;
      index: number;
    }[];
    index: number;
  };
  VideoPlayer: {data: string};
  ImageSection: {
    exterior:
      | {[key: string]: {value: string; image: string} | string}
      | undefined;
    interior:
      | {[key: string]: {value: string; image: string} | string}
      | undefined;
    damages:
      | {[key: string]: {value: string; image: string} | string}
      | undefined;
    selectedIndex: number;
  };
};

type BottomStackParamList = {
  HomeStack: undefined;
  VehicleStack: undefined;
  ProfileStack: undefined;
  ValuatorStack: undefined;
};
