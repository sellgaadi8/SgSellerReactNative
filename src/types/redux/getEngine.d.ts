type GET_ENGINE_DETAILS = 'sgSeller/getEngineDetails';

type ENGINE = {
  video: string;
  centre_back: string;
  centre_front: string;
  meter_console: string;
  engine_hood_open: string;
  right_corner_back: string;
  interior_dashboard: string;
  left_wheel_corner_front: string;
};

type GetEngineDetailsState = {
  called: boolean;
  error: boolean;
  success: boolean;
  data: ENGINE | null;
};

type GetEngineDetailsAction = {
  type: GET_ENGINE_DETAILS;
  payload: GetEngineDetailsState;
};
