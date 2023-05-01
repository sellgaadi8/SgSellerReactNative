import axiosInstance from '../../axios';
import {LOGIN_SUBMIT} from '../../utils/api';
import {AppDispatch} from '../store';

const LOGIN: LOGIN = 'sgSeller/login';

const initialState: LoginState = {
  success: false,
  message: '',
  error: false,
  called: false,
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
  (phone: string, isOtp: string, otp: string) => (dispatch: AppDispatch) => {
    const url = LOGIN_SUBMIT;

    const body = new FormData();

    body.append('phone', phone);
    body.append('isOtp', isOtp);
    body.append('otp', otp);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(loginAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            loginAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        } else if (err?.msg || err?.message) {
          dispatch(
            loginAction({
              error: true,
              called: true,
              success: false,
              message: err.message,
            }),
          );
        }
      });
  };
