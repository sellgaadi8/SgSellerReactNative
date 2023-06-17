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
    video: string | null;
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
    permit_upto: string;
    duplicate_key: string;
    rc_noc_issued: string;
    road_tax_paid: string;
    mismatch_in_rc: string;
    cng_lpg_fitment: string;
    rc_availability: string;
    partipeshi_request: string;
    under_hypothication: string;
    cng_lpg_fitment_endorsed_on_rc: string;
    chasis_no_image: string | null;
    duplicate_key_image: string | null;
    road_tax_paid_image: string | null;
    rc_availability_image: string | null;
    partipeshi_request_image: string | null;
  } | null;
  external_panel: {
    roof: string | null;
    bonnet_head: string | null;
    dickey_door: string | null;
    left_fender: string | null;
    right_fender: string | null;
    left_door_back: string | null;
    left_door_front: string | null;
    right_door_back: string | null;
    right_door_front: string | null;
    left_quater_panel: string | null;
    right_quater_panel: string | null;
    bonnet_head_image: string | null;
    roof_image: string | null;
    dickey_door_image: string | null;
    left_door_front_image: string | null;
    left_door_back_image: string | null;
    right_door_front_image: string | null;
    right_door_back_image: string | null;
    left_fender_image: string | null;
    right_fender_image: string | null;
    left_quater_panel_image: string | null;
    right_quater_panel_image: string | null;
  } | null;
  exterior: {
    boot_floor: string | null;
    left_apron: string | null;
    right_apron: string | null;
    left_pillarA: string | null;
    left_pillarB: string | null;
    left_pillarC: string | null;
    right_pillarA: string | null;
    right_pillarB: string | null;
    right_pillarC: string | null;
    left_apron_leg: string | null;
    right_apron_leg: string | null;
    left_pillarA_image: string | null;
    left_pillarB_image: string | null;
    left_pillarC_image: string | null;
    right_pillarA_image: string | null;
    right_pillarB_image: string | null;
    right_pillarC_image: string | null;
    left_apron_image: string | null;
    left_apron_leg_image: string | null;
    right_apron_leg_image: string | null;
    right_apron_image: string | null;
    boot_floor_image: string | null;
  } | null;
  tyres: {
    spare_type: string;
    lhs_back_type: string;
    rhs_back_type: string;
    lhs_front_type: string;
    rhs_front_type: string;
    lhs_front_image: string;
    rhs_front_image: string;
    lhs_back_image: string;
    rhs_back_image: string;
    spare_image: string;
  } | null;
  engine: {
    ac: string | null;
    heater: string;
    cooling: string;
    condensor: string;
    engine_sound: string;
    exhaust_smoke: string | null;
    engine_mounting: string | null;
    gear_oil_leakage: string | null;
    clutch_bearing_sound: string | null;
    engine_perm_blow_back: string | null;
    gear_oil_leakage_image: string | null;
    exhaust_smoke_image: string | null;
    engine_sound_video: string;
  } | null;
  electricals: {
    overall: string | null;
    music_system: string | null;
    jack_tool_box: string | null;
    power_windows: string | null;
    parking_sensor: string | null;
    electrical_odomoter: string | null;
    lights_crack_broken: string | null;
    lights_crack_broken_image: string | null;
  } | null;
  steering: {
    brake: string | null;
    steering: string | null;
    suspension: string | null;
    wheel_bearing_noise: string | null;
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
