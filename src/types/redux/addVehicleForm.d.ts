type ADD_VEHICLE_FORM = 'sgSeller/addForm';

type VehicleForm = {
  tyres: {
    heading: string;
    percentage: number;
    sub_heading: string;
  };
  car_images: {
    heading: string;
    percentage: number;
    sub_heading: string;
  };
  engine: {
    heading: string;
    percentage: number;
    sub_heading: string;
  };
  ac_info: {
    heading: string;
    percentage: number;
    sub_heading: string;
  };
  car_docs: {
    heading: string;
    percentage: number;
    sub_heading: string;
  };
  steering: {
    heading: string;
    percentage: number;
    sub_heading: string;
  };
  electricals: {
    heading: string;
    percentage: number;
    sub_heading: string;
  };
  display_info: {
    heading: string;
    percentage: number;
    sub_heading: string;
  };
  exterior_img: {
    heading: string;
    percentage: number;
    sub_heading: string;
  };
  external_panel: {
    heading: string;
    percentage: number;
    sub_heading: string;
  };
  total_percentage: number;
};

type AddVehicleFormState = {
  error: boolean;
  called: boolean;
  success: boolean;
  data: VehicleForm | null;
};

type AddVehicleFormAction = {
  type: ADD_VEHICLE_FORM;
  payload: AddVehicleFormState;
};
