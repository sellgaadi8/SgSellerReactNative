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
