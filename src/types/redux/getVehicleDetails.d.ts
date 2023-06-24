type GET_VEHICLE_DETAIL = 'sgSeller/getVehicleDetail';

type VehicleDetail = {
  display_info: {
    make: {
      value: string;
      image: string;
    };
    color: {
      value: string;
      image: string;
    };
    model: {
      value: string;
      image: string;
    };
    variant: {
      value: string;
      image: string;
    };
    mfg_year: {
      value: string;
      image: string;
    };
    reg_date: {
      value: string;
      image: string;
    };
    fuel_type: {
      value: string;
      image: string;
    };
    no_of_kms: {
      value: string;
      image: string;
    };
    no_of_owners: {
      value: string;
      image: string;
    };
    transmission: {
      value: string;
      image: string;
    };
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
    rto: {
      value: string;
      image: string;
    };
    chasis_no: {
      value: string;
      image: string;
    };
    insurance: {
      value: string;
      image: string;
    };
    permit_upto: {
      value: string;
      image: string;
    };
    fitness_upto: {
      value: string;
      image: string;
    };
    duplicate_key: {
      value: string;
      image: string;
    };
    rc_noc_issued: {
      value: string;
      image: string;
    };
    road_tax_paid: {
      value: string;
      image: string;
    };
    mismatch_in_rc: {
      value: string;
      image: string;
    };
    cng_lpg_fitment: {
      value: string;
      image: string;
    };
    rc_availability: {
      value: string;
      image: string;
    };
    partipeshi_request: {
      value: string;
      image: string;
    };
    under_hypothication: {
      value: string;
      image: string;
    };
    cng_lpg_fitment_endorsed_on_rc: {
      value: string;
      image: string;
    };
  };
  exterior_img: {
    boot_floor: {
      value: string;
      image: string;
    };
    left_apron: {
      value: string;
      image: string;
    };
    right_apron: {
      value: string;
      image: string;
    };
    right_pillarC: {
      value: string;
      image: string;
    };
    left_apron_leg: {
      value: string;
      image: string;
    };
    right_apron_leg: {
      value: string;
      image: string;
    };
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
    dickey_door: {
      value: string;
      image: string;
    };
    left_fender: {
      value: string;
      image: string;
    };
    right_fender: {
      value: string;
      image: string;
    };
    left_door_back: {
      value: string;
      image: string;
    };
    left_door_front: {
      value: string;
      image: string;
    };
    right_door_back: {
      value: string;
      image: string;
    };
    right_door_front: {
      value: string;
      image: string;
    };
    left_quater_panel: {
      value: string;
      image: string;
    };
    right_quater_panel: {
      value: string;
      image: string;
    };
  };
  tyres: {
    spare_type: {
      value: string;
      image: string;
    };
    spare_image: {
      value: string;
      image: string;
    };
    lhs_back_type: {
      value: string;
      image: string;
    };
    rhs_back_type: {
      value: string;
      image: string;
    };
    lhs_back_image: {
      value: string;
      image: string;
    };
    lhs_front_type: {
      value: string;
      image: string;
    };
    rhs_back_image: {
      value: string;
      image: string;
    };
    rhs_front_type: {
      value: string;
      image: string;
    };
    lhs_front_image: {
      value: string;
      image: string;
    };
    rhs_front_image: {
      value: string;
      image: string;
    };
  };
  engine: {
    ac: {
      value: string;
      image: string;
    };
    heater: {
      value: string;
      image: string;
    };
    cooling: {
      value: string;
      image: string;
    };
    condensor: {
      value: string;
      image: string;
    };
    exhaust_smoke: {
      value: string;
      image: string;
    };
    engine_mounting: {
      value: string;
      image: string;
    };
    gear_oil_leakage: {
      value: string;
      image: string;
    };
    engine_sound_video: {
      value: string;
      image: string;
    };
    clutch_bearing_sound: {
      value: string;
      image: string;
    };
    engine_perm_blow_back: {
      value: string;
      image: string;
    };
  };
  electricals: {
    overall: {
      value: string;
      image: string;
    };
    music_system: {
      value: string;
      image: string;
    };
    jack_tool_box: {
      value: string;
      image: string;
    };
    power_windows: {
      value: string;
      image: string;
    };
    parking_sensor: {
      value: string;
      image: string;
    };
    electrical_odomoter: {
      value: string;
      image: string;
    };
    lights_crack_broken: {
      value: string;
      image: string;
    };
  };
  steering: {
    brake: {
      value: string;
      image: string;
    };
    steering: {
      value: string;
      image: string;
    };
    suspension: {
      value: string;
      image: string;
    };
    wheel_bearing_noise: {
      value: string;
      image: string;
    };
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

type VehicleImageType = {
  value: string;
  image: string;
};
