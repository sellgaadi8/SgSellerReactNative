type GET_ELECTRICAL_DETAILS = 'sgSeller/getElectricalDetails';

type ELECTRICAL = {
  video: string;
  centre_back: string;
  centre_front: string;
  meter_console: string;
  engine_hood_open: string;
  right_corner_back: string;
  interior_dashboard: string;
  left_wheel_corner_front: string;
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
