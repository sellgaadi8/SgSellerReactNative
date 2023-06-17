type GET_CAR_IAMGES = 'sgSeller/getCarImages';

type CarImages = {
  video: {
    url: string;
    file: string;
  };
  centre_back: {
    url: string;
    file: string;
  };
  centre_front: {
    url: string;
    file: string;
  };
  meter_console: {
    url: string;
    file: string;
  };
  engine_hood_open: {
    url: string;
    file: string;
  };
  right_corner_back: {
    url: string;
    file: string;
  };
  interior_dashboard: {
    url: string;
    file: string;
  };
  left_wheel_corner_front: {
    url: string;
    file: string;
  };
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
