type GET_CAR_IAMGES = 'sgSeller/getCarImages';

type CarImages = {
  video: string;
  centre_back: string;
  centre_front: string;
  meter_console: string;
  engine_hood_open: string;
  right_corner_back: string;
  interior_dashboard: string;
  left_wheel_corner_front: string;
};

type GetCarImageState = {
  called: boolean;
  error: boolean;
  success: boolean;
  data: CarImages | null;
};

type GetCarImageAction = {
  type: GET_CAR_IAMGES;
  payload: GetCarImageState;
};
