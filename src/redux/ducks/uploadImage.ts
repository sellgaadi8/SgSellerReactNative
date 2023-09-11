import axios, {AxiosRequestConfig} from 'axios';
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
  (image: ImageType, path: string, maxRetries: number = 3) =>
  async (dispatch: AppDispatch) => {
    const url = UPLOAD_IMAGE;
    const token = await getUserToken();

    console.log('==>', image);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();
    body.append('path', path);
    body.append('image', image);

    // axiosInstance
    //   .post(url, body, config)
    //   .then(res => {
    //     console.log('res', res.data);

    //     dispatch(uploadImageAction({...res.data, error: false}));
    //   })
    //   .catch(err => {
    //     handleError(err, dispatch);
    //     if (err?.request?._response) {
    //       dispatch(
    //         uploadImageAction({
    //           ...JSON.parse(err.request._response),
    //           error: true,
    //         }),
    //       );
    //     }
    //   });

    let retries = 0;

    const makeRequest = async () => {
      try {
        const res = await axiosInstance.post(url, body, config);
        console.log('res', res.data);
        dispatch(uploadImageAction({...res.data, error: false}));
      } catch (err) {
        if (retries < maxRetries) {
          // Retry the request if it fails, up to maxRetries times
          retries++;
          console.log(`Attempt ${retries} failed. Retrying...`);
          await makeRequest();
        } else {
          // If maxRetries reached, handle the error
          handleError(err, dispatch);
          if (axios.isAxiosError(err)) {
            dispatch(
              uploadImageAction({
                ...JSON.parse(err.request._response),
                error: true,
              }),
            );
          }
        }
      }
    };
    await makeRequest();
  };
