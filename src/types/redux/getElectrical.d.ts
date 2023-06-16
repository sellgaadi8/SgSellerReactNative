type GET_ELECTRICAL_DETAILS = 'sgSeller/getElectricalDetails';

type ELECTRICAL = {
  power_windows: string;
  music_system: string;
  electrical_odomoter: string;
  parking_sensor: string;
  overall: string;
  jack_tool_box: string;
  lights_crack_broken: string;
  lights_crack_broken_image: string | null;
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
