import axiosInstance from '../../axios';
import {LOGOUT_URL} from '../../utils/api';
import Globals from '../../utils/globals';
import {deleteUserToken, getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const LOGOUT: LOGOUT = 'sgSeller/logout';

const initialState: LogoutState = {
  success: false,
  message: null,
  error: false,
  called: false,
};

export default (state = initialState, action: LogoutAction): LogoutState => {
  switch (action.type) {
    case LOGOUT:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const logoutAction = (res: LogoutState): LogoutAction => {
  return {type: LOGOUT, payload: {...res, called: true}};
};

export const onLogout = () => async (dispatch: AppDispatch) => {
  const url = LOGOUT_URL;

  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axiosInstance
    .post(url, '', config)
    .then(async res => {
      Globals.instance().setTokenValidity(0);
      await deleteUserToken();
      dispatch(logoutAction({...res.data, error: false}));
    })
    .catch(async _ => {
      await deleteUserToken();
      dispatch(
        logoutAction({
          called: true,
          error: true,
          message: null,
          success: false,
        }),
      );
    });
};
