type UPLOAD_IMAGE_URL = 'sgSeller/uploadImage';

type UploadImageState = {
  called: boolean;
  success: boolean;
  image: {
    url: string;
    file: string;
  } | null;
  error: boolean;
};

type UploadImageAction = {
  type: UPLOAD_IMAGE_URL;
  payload: UploadImageState;
};
