import axiosInstance from '../../axios';
import {updateSteeringUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_STEERING: UPDATE_STEERING = 'sgSeller/updateSteering';

const initialState: UpdateSteeringState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: UpdateSteeringAction,
): UpdateSteeringState => {
  switch (action.type) {
    case UPDATE_STEERING:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateSteeringAction = (
  res: UpdateSteeringState,
): UpdateSteeringAction => {
  return {type: UPDATE_STEERING, payload: {...res, called: true}};
};

export const onUpdateSteering =
  (
    id: string,
    suspension: string,
    steering: string,
    brake: string,
    wheel_bearing_noise: string,
    overall_rating: number,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = updateSteeringUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    body.append('suspension', suspension);
    body.append('steering', steering);
    body.append('brake', brake);
    body.append('wheel_bearing_noise', wheel_bearing_noise);
    body.append('overall_rating', overall_rating);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateSteeringAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._repsonse) {
          dispatch(
            updateSteeringAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
