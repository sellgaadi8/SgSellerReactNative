import axiosInstance from '../../axios';
import {addSteeringUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ADD_STEERING: ADD_STEERING = 'sgSeller/addSteering';

const initialState: AddSteeringState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: AddSteeringAction,
): AddSteeringState => {
  switch (action.type) {
    case ADD_STEERING:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const addSteeringAction = (res: AddSteeringState): AddSteeringAction => {
  return {type: ADD_STEERING, payload: {...res, called: true}};
};

export const onAddSteering =
  (
    id: string,
    suspension: string,
    steering: string,
    brake: string,
    wheel_bearing_noise: string,
    overall_rating: number,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = addSteeringUrl(id);

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
        dispatch(addSteeringAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            addSteeringAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
