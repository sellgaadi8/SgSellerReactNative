import axiosInstance from '../../axios';
import {addSuspension} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ADD_SUSPENSION: ADD_SUSPENSION = 'sgSeller/addSuspension';

const initialState: AddSuspensionState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: AddSuspensionAction,
): AddSuspensionState => {
  switch (action.type) {
    case ADD_SUSPENSION:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const addSuspensionAction = (res: AddSuspensionState): AddSuspensionAction => {
  return {type: ADD_SUSPENSION, payload: {...res, called: true}};
};

export const onAddSuspension =
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
    const url = addSuspension(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    body.append('handle', handle);
    body.append('front_shock_absorber', front_shock_absorber);
    body.append('rear_shock_absorber', rear_shock_absorber);
    body.append('front_brake_condition', front_brake_condition);
    body.append('rear_brake_condition', rear_brake_condition);
    body.append('handle_image', handle_image);
    body.append('front_shock_absorber_image', front_shock_absorber_image);
    body.append('rear_shock_absorber_image', rear_shock_absorber_image);
    body.append('front_brake_condition_image', front_brake_condition_image);
    body.append('rear_brake_condition_image', rear_brake_condition_image);
    body.append('overall_rating', overall_rating);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(addSuspensionAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._repsonse) {
          dispatch(
            addSuspensionAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
