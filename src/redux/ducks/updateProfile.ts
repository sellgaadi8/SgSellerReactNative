import axiosInstance from '../../axios';
import {UPDATE_PROFILE} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_PROFILE_DETAILS: UPDATE_PROFILE_DETAILS = 'sgSeller/updateProfile';

const initialState: UpdateProfileState = {
  called: false,
  success: false,
  error: false,
  message: null,
};

export default (
  state = initialState,
  action: UpdateProfileAction,
): UpdateProfileState => {
  switch (action.type) {
    case UPDATE_PROFILE_DETAILS:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateProfileAction = (res: UpdateProfileState): UpdateProfileAction => {
  return {type: UPDATE_PROFILE_DETAILS, payload: {...res, called: true}};
};

export const onUpdateProfile =
  (address: string) => async (dispatch: AppDispatch) => {
    const url = UPDATE_PROFILE;
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
    };

    const body = new FormData();
    body.append('address', address);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateProfileAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._repsonse) {
          dispatch(
            updateProfileAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
