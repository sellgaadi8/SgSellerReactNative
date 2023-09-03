type VEHICLE_LIST = 'sgSeller/vehicleList';

type Vehicle = {
  make: string;
  color: string;
  model: string;
  variant: string;
  mfg_year: string;
  reg_date: string;
  fuel_type: string;
  no_of_kms: string;
  no_of_owners: string;
  transmission: string;
  uuid: string;
  images: string[];
  vehicle_status: string;
  ocb_value: string;
  highest_bid: string;
  auction_ends_at: string;
};

type VehicleListState = {
  called: boolean;
  success: boolean;
  data: {
    vehicle_list: Vehicle[];
    count: number;
  };
  error: boolean;
};

type VehicleListAction = {
  type: VEHICLE_LIST;
  payload: VehicleListState;
};
