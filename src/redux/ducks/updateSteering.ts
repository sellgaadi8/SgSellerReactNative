import axiosInstance from '../../axios';
import {updateSteeringUrl} from '../../utils/api';
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
    left_pillarA: string,
    left_pillarB: string,
    left_pillarC: string,
    right_pillarB: string,
    left_apron: string,
    left_apron_leg: string,
    right_apron_leg: string,
    right_pillarA: string,
    right_pillarC: string,
    right_apron: string,
    boot_floor: string,
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

    body.append('left_pillarA', left_pillarA);
    body.append('left_pillarB', left_pillarB);
    body.append('left_pillarC', left_pillarC);
    body.append('right_pillarB', right_pillarB);
    body.append('left_apron', left_apron);
    body.append('left_apron_leg', left_apron_leg);
    body.append('right_apron_leg', right_apron_leg);
    body.append('right_pillarA', right_pillarA);
    body.append('right_pillarC', right_pillarC);
    body.append('right_apron', right_apron);
    body.append('boot_floor', boot_floor);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateSteeringAction({...res.data, error: false}));
      })
      .catch(err => {
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
