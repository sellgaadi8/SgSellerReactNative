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
  Ac: undefined;
  VehicleDetail: {title: string; vehicleId: string};
  DetailsViewPage: undefined;
  ImageViewerCarousel: {
    onRemoveImage?: (index: number) => void;
    updateImages?: (data: FundraiserMedia[]) => void;
    data: FundraiserMedia[];
    index: number;
  };
};

type BottomStackParamList = {
  HomeStack: undefined;
  VehicleStack: undefined;
  ProfileStack: undefined;
  ValuatorStack: undefined;
};
