type UPDATE_CAR_IMAGES = 'sgSeller/updateCarImage';

type UpdateCarImageState = {
  called: boolean;
  error: boolean;
  success: boolean;
  message: string;
  uuid: string;
};

type UpdateCarImageAction = {
  type: UPDATE_CAR_IMAGES;
  payload: UploadCarImageState;
};
