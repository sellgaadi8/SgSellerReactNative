type ADD_VEHICLE_FORM = 'sgSeller/addForm';

type VehicleForm = {
  [key: string]: {heading: string; percentage: number; sub_heading: string};
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
