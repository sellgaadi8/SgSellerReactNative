import axiosInstance from '../../axios';
import {updateSuspensionUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_SUSPENSION: UPDATE_SUSPENSION = 'sgSeller/updateSuspension';

const initialState: UpdateSuspensionState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: UpdateSuspensionAction,
): UpdateSuspensionState => {
  switch (action.type) {
    case UPDATE_SUSPENSION:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateSuspensionAction = (
  res: UpdateSuspensionState,
): UpdateSuspensionAction => {
  return {type: UPDATE_SUSPENSION, payload: {...res, called: true}};
};

export const onUpdateSuspension =
  (
    id: string,
    handle: string,
    front_shock_absorber: string,
    rear_shock_absorber: string,
    front_brake_condition: string,
    rear_brake_condition: string,
    handle_image: string,
    front_shock_absorber_image: string,
    rear_shock_absorber_image: string,
    front_brake_condition_image: string,
    rear_brake_condition_image: string,
    overall_rating: number,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = updateSuspensionUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    if (handle && handle.length !== 0) {
      body.append('handle', handle);
    }

    if (front_shock_absorber && front_shock_absorber.length !== 0) {
      body.append('front_shock_absorber', front_shock_absorber);
    }

    if (rear_shock_absorber && rear_shock_absorber.length !== 0) {
      body.append('rear_shock_absorber', rear_shock_absorber);
    }

    if (front_brake_condition && front_brake_condition.length !== 0) {
      body.append('front_brake_condition', front_brake_condition);
    }

    if (rear_brake_condition && rear_brake_condition.length !== 0) {
      body.append('rear_brake_condition', rear_brake_condition);
    }

    if (handle_image && handle_image.length !== 0) {
      body.append('handle_image', handle_image);
    }

    if (front_shock_absorber_image && front_shock_absorber_image.length !== 0) {
      body.append('front_shock_absorber_image', front_shock_absorber_image);
    }

    if (rear_shock_absorber_image && rear_shock_absorber_image.length !== 0) {
      body.append('rear_shock_absorber_image', rear_shock_absorber_image);
    }

    if (
      front_brake_condition_image &&
      front_brake_condition_image.length !== 0
    ) {
      body.append('front_brake_condition_image', front_brake_condition_image);
    }

    if (rear_brake_condition_image && rear_brake_condition_image.length !== 0) {
      body.append('rear_brake_condition_image', rear_brake_condition_image);
    }

    if (overall_rating) {
      body.append('overall_rating', overall_rating);
    }

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateSuspensionAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            updateSuspensionAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
