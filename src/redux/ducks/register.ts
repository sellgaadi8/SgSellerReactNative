import {AxiosError} from 'axios';
import axiosInstance from '../../axios';
import {REGISTER_USER} from '../../utils/api';
import {handleError, postAuth} from '../../utils/helper';
import {AppDispatch} from '../store';

const REGISTER: REGISTER = 'sgSeller/register';

const initialState: RegisterState = {
  success: false,
  message: '',
  called: false,
};

export default (
  state = initialState,
  action: RegisterAction,
): RegisterState => {
  switch (action.type) {
    case REGISTER:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const registerAction = (res: RegisterState): RegisterAction => {
  return {type: REGISTER, payload: {...res, called: true}};
};

export const onRegister =
  (
    name: string,
    phone: string,
    city: string,
    email: string,
    seller_type: string,
  ) =>
  (dispatch: AppDispatch) => {
    const url = REGISTER_USER;

    const body = JSON.stringify({
      name: name,
      phone: phone,
      city: city,
      email: email,
      seller_type: seller_type,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(registerAction({...res.data, error: false}));
        if (res.data.token) {
          postAuth(res.data.token);
        }
      })
      .catch((error: AxiosError) => {
        handleError(error, dispatch);
        if (error.request._response) {
          dispatch(
            registerAction({
              ...JSON.parse(error.request._response),
              error: true,
            }),
          );
        }
      });
  };
