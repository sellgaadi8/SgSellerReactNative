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
    video: string;
    centre_back: string;
    centre_front: string;
    meter_console: string;
    engine_hood_open: string;
    right_corner_back: string;
    interior_dashboard: string;
    left_wheel_corner_front: string;
  };
  car_docs: {
    rto: string;
    chasis_no: {
      value: string;
      image: string;
    };
    insurance: string;
    permit_upto: string;
    fitness_upto: string;
    duplicate_key: {
      value: string;
      image: string;
    };
    rc_noc_issued: string;
    road_tax_paid: {
      value: string;
      image: string;
    };
    mismatch_in_rc: string;
    cng_lpg_fitment: string;
    rc_availability: {
      value: string;
      image: string;
    };
    partipeshi_request: {
      value: string;
      image: string;
    };
    under_hypothication: string;
    cng_lpg_fitment_endorsed_on_rc: string;
  };
  exterior_img: {
    boot_floor: string;
    left_apron: string;
    right_apron: string;
    right_pillarC: string;
    left_apron_leg: string;
    right_apron_leg: string;
    left_pillarA: {
      value: string;
      image: string;
    };
    left_pillarB: {
      value: string;
      image: string;
    };
    left_pillarC: {
      value: string;
      image: string;
    };
    right_pillarA: {
      value: string;
      image: string;
    };
    right_pillarB: {
      value: string;
      image: string;
    };
  };
  external_panel: {
    roof: {
      value: string;
      image: string;
    };
    bonnet_head: {
      value: string;
      image: string;
    };
    dickey_door: string;
    left_fender: string;
    right_fender: string;
    left_door_back: string;
    left_door_front: string;
    right_door_back: string;
    right_door_front: string;
    left_quater_panel: string;
    right_quater_panel: string;
  };
  tyres: {
    spare_type: string;
    spare_image: string;
    lhs_back_type: string;
    rhs_back_type: string;
    lhs_back_image: string;
    lhs_front_type: string;
    rhs_back_image: string;
    rhs_front_type: string;
    lhs_front_image: string;
    rhs_front_image: string;
  };
  engine: {
    ac: string;
    heater: string;
    cooling: string;
    condensor: string;
    engine_sound: string;
    exhaust_smoke: {
      value: string;
      image: string;
    };
    engine_mounting: string;
    gear_oil_leakage: {
      value: string;
      image: string;
    };
    engine_sound_video: string;
    clutch_bearing_sound: string;
    engine_perm_blow_back: string;
  };
  electricals: {
    overall: string;
    music_system: {
      value: string;
      image: string;
    };
    jack_tool_box: string;
    overall_image: string;
    power_windows: {
      value: string;
      image: string;
    };
    parking_sensor: string;
    electrical_odomoter: {
      value: string;
      image: string;
    };
  };
  steering: {
    brake: string;
    steering: string;
    suspension: string;
    wheel_bearing_noise: string;
  };
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
