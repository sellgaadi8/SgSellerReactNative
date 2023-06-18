import axiosInstance from '../../axios';
import {UPDATE_VALUATOR} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_VALUATOR_DETAIL: UPDATE_VALUATOR_DETAIL =
  'sgSeller/updateValuator';

const initialState: UpdateValuatorState = {
  called: false,
  success: false,
  error: false,
  message: null,
};

export default (
  state = initialState,
  action: UpdateValuatorAction,
): UpdateValuatorState => {
  switch (action.type) {
    case UPDATE_VALUATOR_DETAIL:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateValuatorAction = (
  res: UpdateValuatorState,
): UpdateValuatorAction => {
  return {type: UPDATE_VALUATOR_DETAIL, payload: {...res, called: true}};
};

export const onUpdateValuator =
  (
    valuator_name: string,
    valuator_email: string,
    valuator_phone_no: string,
    valuator_aadhar: string,
    valuator_address: string,
    valuator_dealership_id: string,
    valuator_uuid: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = UPDATE_VALUATOR;
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
    };

    const body = new FormData();
    body.append('valuator_name', valuator_name);
    body.append('valuator_email', valuator_email);
    body.append('valuator_phone_no', valuator_phone_no);
    body.append('valuator_aadhar', valuator_aadhar);
    body.append('valuator_address', valuator_address);
    body.append('valuator_dealership_id', valuator_dealership_id);
    body.append('valuator_uuid', valuator_uuid);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateValuatorAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._repsonse) {
          dispatch(
            updateValuatorAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
