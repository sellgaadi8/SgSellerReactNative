type UPLOAD_CAR_IMAGES = 'sgSeller/uploadCarImage';

type UploadCarImageState = {
  called: boolean;
  error: boolean;
  success: boolean;
  message: string;
  uuid: string;
};

type UploadCarImageAction = {
  type: UPLOAD_CAR_IMAGES;
  payload: UploadCarImageState;
};
