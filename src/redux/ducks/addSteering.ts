import axiosInstance from '../../axios';
import {addSteeringUrl} from '../../utils/api';
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
  ) =>
  async (dispatch: AppDispatch) => {
    const url = addSteeringUrl(id);

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

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(addSteeringAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            addSteeringAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
