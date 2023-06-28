type GET_ELECTRICAL_DETAILS = 'sgSeller/getElectricalDetails';

type ELECTRICAL = {
  power_windows: string | null;
  music_system: string | null;
  electrical_odomoter: string | null;
  parking_sensor: string | null;
  overall: string | null;
  jack_tool_box: string | null;
  lights_crack_broken: string | null;
  power_windows_image: {
    url: string;
    file: string;
  } | null;
  music_system_image: {
    url: string;
    file: string;
  } | null;
  electrical_odomoter_image: {
    url: string;
    file: string;
  } | null;
  parking_sensor_image: {
    url: string;
    file: string;
  } | null;
  overall_image: {
    url: string;
    file: string;
  } | null;
  jack_tool_box_image: {
    url: string;
    file: string;
  } | null;
  lights_crack_broken_image: {
    url: string;
    file: string;
  } | null;
  headlight: string | null;
  tailLight: string | null;
  brakeLight: string | null;
  front_turn_indicator: string | null;
  rear_turn_indicator: string | null;
  ignition_switch: string | null;
  indicator_switch: string | null;
  horn: string | null;
  headlight_switch: string | null;
  passing_light_switch: string | null;
  self_starter_switch: string | null;
  high_low_beam_switch: string | null;
  instrument_cluster: string | null;
  battery: string | null;
  lockset: string | null;
  headlight_image: {
    url: string;
    file: string;
  } | null;
  tailLight_image: {
    url: string;
    file: string;
  } | null;
  brakeLight_image: {
    url: string;
    file: string;
  } | null;
  front_turn_indicator_image: {
    url: string;
    file: string;
  } | null;
  rear_turn_indicator_image: {
    url: string;
    file: string;
  } | null;
  ignition_switch_image: {
    url: string;
    file: string;
  } | null;
  indicator_switch_image: {
    url: string;
    file: string;
  } | null;
  horn_image: {
    url: string;
    file: string;
  } | null;
  headlight_switch_image: {
    url: string;
    file: string;
  } | null;
  passing_light_switch_image: {
    url: string;
    file: string;
  } | null;
  self_starter_switch_image: {
    url: string;
    file: string;
  } | null;
  high_low_beam_switch_image: {
    url: string;
    file: string;
  } | null;
  instrument_cluster_image: {
    url: string;
    file: string;
  } | null;
  battery_image: {
    url: string;
    file: string;
  } | null;
  lockset_image: {
    url: string;
    file: string;
  } | null;
  overall_rating: number | null;
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
