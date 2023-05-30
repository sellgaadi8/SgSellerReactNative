type GET_CAR_IAMGES = 'sgSeller/getCarImages';

type GetCarImageState = {
  called: boolean;
  error: boolean;
  success: boolean;
};

type GetCarImageAction = {
  type: GET_CAR_IAMGES;
  payload: GetCarImageState;
};
