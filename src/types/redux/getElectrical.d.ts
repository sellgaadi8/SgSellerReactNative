type GET_ELECTRICAL_DETAILS = 'sgSeller/getElectricalDetails';

type ELECTRICAL = {
  power_windows: string;
  music_system: string;
  electrical_odomoter: string;
  parking_sensor: string;
  overall: string;
  jack_tool_box: string;
  lights_crack_broken: string;
  power_windows_image: {
    url: string;
    file: string;
  };
  music_system_image: {
    url: string;
    file: string;
  };
  electrical_odomoter_image: {
    url: string;
    file: string;
  };
  parking_sensor_image: {
    url: string;
    file: string;
  };
  overall_image: {
    url: string;
    file: string;
  };
  jack_tool_box_image: {
    url: string;
    file: string;
  };
  lights_crack_broken_image: {
    url: string;
    file: string;
  };
  headlight: string;
  tailLight: string;
  brakeLight: string;
  front_turn_indicator: string;
  rear_turn_indicator: string;
  ignition_switch: string;
  indicator_switch: string;
  horn: string;
  headlight_switch: string;
  passing_light_switch: string;
  self_starter_switch: string;
  high_low_beam_switch: string;
  instrument_cluster: string;
  battery: string;
  lockset: string;
  headlight_image: {
    url: string;
    file: string;
  };
  tailLight_image: {
    url: string;
    file: string;
  };
  brakeLight_image: {
    url: string;
    file: string;
  };
  front_turn_indicator_image: {
    url: string;
    file: string;
  };
  rear_turn_indicator_image: {
    url: string;
    file: string;
  };
  ignition_switch_image: {
    url: string;
    file: string;
  };
  indicator_switch_image: {
    url: string;
    file: string;
  };
  horn_image: {
    url: string;
    file: string;
  };
  headlight_switch_image: {
    url: string;
    file: string;
  };
  passing_light_switch_image: {
    url: string;
    file: string;
  };
  self_starter_switch_image: {
    url: string;
    file: string;
  };
  high_low_beam_switch_image: {
    url: string;
    file: string;
  };
  instrument_cluster_image: {
    url: string;
    file: string;
  };
  battery_image: {
    url: string;
    file: string;
  };
  lockset_image: {
    url: string;
    file: string;
  };
};

type GetElectricalState = {
  called: boolean;
  error: boolean;
  success: boolean;
  data: ELECTRICAL | null;
};

type GetElectricalDetailsAction = {
  type: GET_ELECTRICAL_DETAILS;
  payload: GetElectricalState;
};
