type GET_VEHICLE_DETAIL = 'sgSeller/getVehicleDetail';

type VehicleDetail = {
  display_info: {
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
  };
  car_images: {
    video: null;
    centre_back: string;
    centre_front: string;
    meter_console: string;
    engine_hood_open: string;
    right_corner_back: string;
    interior_dashboard: string;
    left_wheel_corner_front: string;
  } | null;
  car_docs: {
    rto: string;
    chasis_no: string;
    insurance: string;
    fitness_upto: string;
    duplicate_key: string;
    rc_noc_issued: string;
    road_tax_paid: string;
    mismatch_in_rc: string;
    cng_lpg_fitment: string;
    rc_availability: string;
    partipeshi_request: string;
    under_hypothication: string;
    cng_lpg_fitment_endorsed_on_rc: string;
  } | null;
  external_panel: {
    roof: string;
    bonnet_head: string;
    dickey_door: string;
    left_fender: string;
    right_fender: string;
    left_door_back: string;
    left_door_front: string;
    right_door_back: string;
    right_door_front: string;
    left_quater_panel: string;
    right_quater_panel: string;
  } | null;
  tyres: {
    spare_type: string;
    lhs_back_type: string;
    rhs_back_type: string;
    lhs_front_type: string;
    rhs_front_type: string;
  } | null;
  engine: {
    ac: string;
    heater: string;
    cooling: string;
    condensor: string;
    engine_sound: string;
    exhaust_smoke: string;
    engine_mounting: string;
    gear_oil_leakage: string;
    clutch_bearing_sound: string;
    engine_perm_blow_back: string;
  } | null;
  electricals: {
    overall: string;
    music_system: string;
    jack_tool_box: string;
    power_windows: string;
    parking_sensor: string;
    electrical_odomoter: string;
    lights_crack_broken: string;
  } | null;
  steering: {
    brake: string;
    steering: string;
    suspension: string;
    wheel_bearing_noise: string;
  } | null;
};

type GetVehicleDetailState = {
  data: VehicleDetail | null;
  success: boolean;
  called: boolean;
  error: boolean;
};

type GetVehicleDetailAction = {
  type: GET_VEHICLE_DETAIL;
  payload: GetVehicleDetailState;
};
