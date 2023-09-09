import {AxiosRequestConfig} from 'axios';
import axiosInstance from '../../axios';
import {ImageType} from '../../types/propsTypes';
import {UPLOAD_IMAGE} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPLOAD_IMAGE_URL: UPLOAD_IMAGE_URL = 'sgSeller/uploadImage';

const initialState: UploadImageState = {
  called: false,
  success: false,
  error: false,
  image: null,
  message: '',
};

export default (
  state = initialState,
  action: UploadImageAction,
): UploadImageState => {
  switch (action.type) {
    case UPLOAD_IMAGE_URL:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const uploadImageAction = (res: UploadImageState): UploadImageAction => {
  return {type: UPLOAD_IMAGE_URL, payload: {...res, called: true}};
};

export const onUploadImage =
  (image: ImageType, path: string) => async (dispatch: AppDispatch) => {
    const url = UPLOAD_IMAGE;
    const token = await getUserToken();

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const body = new FormData();
    body.append('image', image);
    body.append('path', path);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(uploadImageAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            uploadImageAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
