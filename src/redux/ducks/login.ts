import {AxiosError} from 'axios';
import axiosInstance from '../../axios';
import {LOGIN_SUBMIT} from '../../utils/api';
import {handleError, postAuth} from '../../utils/helper';
import {AppDispatch} from '../store';
import messaging from '@react-native-firebase/messaging';

const LOGIN: LOGIN = 'sgSeller/login';

const initialState: LoginState = {
  success: false,
  message: '',
  error: false,
  called: false,
  name: null,
  token: null,
  seller_type: null,
};

export default (state = initialState, action: LoginAction): LoginState => {
  switch (action.type) {
    case LOGIN:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const loginAction = (res: LoginState): LoginAction => {
  return {type: LOGIN, payload: {...res, called: true}};
};

export const onLogin =
  (phone: string, isOtp: boolean, otp: string) =>
  async (dispatch: AppDispatch) => {
    const url = LOGIN_SUBMIT;

    const token = await messaging().getToken();
    console.log('token=>>>>>', token);

    const body = new FormData();

    body.append('phone', phone);
    body.append('isOtp', isOtp);
    body.append('otp', otp);
    body.append('device_token', token);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(loginAction({...res.data, error: false}));
        if (res.data.token) {
          postAuth(res.data.token);
        }
      })
      .catch((error: AxiosError) => {
        handleError(error, dispatch);
        if (error.request._response) {
          dispatch(
            loginAction({
              ...JSON.parse(error.request._response),
              error: true,
            }),
          );
        } else if (error?.message) {
          dispatch(
            loginAction({
              error: true,
              called: true,
              success: false,
              message: error.message,
              name: null,
              seller_type: null,
              token: null,
            }),
          );
        }
      });
  };
