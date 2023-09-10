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
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    if (suspension && suspension.length) {
      body.append('suspension', suspension);
    }

    if (steering && steering.length) {
      body.append('steering', steering);
    }

    if (brake && brake.length) {
      body.append('brake', brake);
    }

    if (wheel_bearing_noise && wheel_bearing_noise.length) {
      body.append('wheel_bearing_noise', wheel_bearing_noise);
    }

    if (overall_rating) {
      body.append('overall_rating', overall_rating);
    }

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateSteeringAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            updateSteeringAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
