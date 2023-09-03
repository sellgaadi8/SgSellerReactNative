import axiosInstance from '../../axios';
import {DELETE_VALUATOR} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const DELETE_VALUATOR_DETAIL: DELETE_VALUATOR_DETAIL =
  'sgSeller/deleteValuator';

const initialState: DeleteValuatorState = {
  called: false,
  success: false,
  error: false,
  message: null,
};

export default (
  state = initialState,
  action: DeleteValuatorAction,
): DeleteValuatorState => {
  switch (action.type) {
    case DELETE_VALUATOR_DETAIL:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const deleteValuatorAction = (
  res: DeleteValuatorState,
): DeleteValuatorAction => {
  return {type: DELETE_VALUATOR_DETAIL, payload: {...res, called: true}};
};

export const onDeleteValuator =
  (valuator_uuid: string) => async (dispatch: AppDispatch) => {
    const url = DELETE_VALUATOR;
    const token = await getUserToken();
    const body = new FormData();

    body.append('valuator_uuid', valuator_uuid);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(deleteValuatorAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            deleteValuatorAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
