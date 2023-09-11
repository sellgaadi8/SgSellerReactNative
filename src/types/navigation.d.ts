type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  CreatePassword: undefined;
  ForgotPassword: undefined;
  BottomNavigation: undefined;
  HomeStack: undefined;
  Profile: undefined;
  ProfileDetails: {title?: string};
  ValuatorForm: {title?: string; list: Valuators};
  ValuatorStack: undefined;
  Vehicles: undefined;
  AddVehicle: {from?: 'edit' | 'add'; title?: string};
  DisplayInfo: {from?: 'edit' | 'add'; title?: string};
  CarImages: {from: 'edit' | 'add'; title?: string};
  CarDocuments: {from: 'edit' | 'add'; title?: string};
  Exterior: {from: 'edit' | 'add'; title?: string};
  ExternelPanel: {from: 'edit' | 'add'; title?: string};
  Tyres: {from: 'edit' | 'add'; title?: string};
  Engine: {from: 'edit' | 'add'; title?: string};
  Electricals: {from: 'edit' | 'add'; title?: string};
  Steering: {from: 'edit' | 'add'; title?: string};
  HandlingSuspension: {from: 'edit' | 'add'; title?: string};
  TwoWheelerExterior: {from: 'edit' | 'add'; title?: string};
  TwoWheelerElectrical: {from: 'edit' | 'add'; title?: string};
  VehicleDetail: {title?: string; vehicleId: string};
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
