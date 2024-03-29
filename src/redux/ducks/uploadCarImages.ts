import {AxiosError} from 'axios';
import axiosInstance from '../../axios';
import {uploadCardImageUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';
import {handleError} from '../../utils/helper';

const UPLOAD_CAR_IMAGES: UPLOAD_CAR_IMAGES = 'sgSeller/uploadCarImage';

const initialState: UploadCarImageState = {
  called: false,
  success: false,
  error: false,
  message: '',
  uuid: '',
};

export default (
  state = initialState,
  action: UploadCarImageAction,
): UploadCarImageState => {
  switch (action.type) {
    case UPLOAD_CAR_IMAGES:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const uploadCarImageAction = (
  res: UploadCarImageState,
): UploadCarImageAction => {
  return {type: UPLOAD_CAR_IMAGES, payload: {...res, called: true}};
};

export const onUploadCarImages =
  (
    id: string,
    left_wheel_corner_front: string,
    centre_front: string,
    right_corner_back: string,
    centre_back: string,
    engine_hood_open: string,
    interior_dashboard: string,
    meter_console: string,
    video: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = uploadCardImageUrl(id);
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const body = new FormData();
    body.append('left_wheel_corner_front', left_wheel_corner_front);
    body.append('centre_front', centre_front);
    body.append('right_corner_back', right_corner_back);
    body.append('centre_back', centre_back);
    body.append('engine_hood_open', engine_hood_open);
    body.append('interior_dashboard', interior_dashboard);
    body.append('meter_console', meter_console);
    body.append('video', video);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(uploadCarImageAction({...res.data, error: false}));
      })
      .catch((err: AxiosError) => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            uploadCarImageAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
