import axiosInstance from '../../axios';
import {GET_ALL_VALUATORS_LIST} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_ALL_VALUATORS: GET_ALL_VALUATORS = 'sgSeller/getAllValuators';

const initialState: GetAllValuatorState = {
  called: false,
  success: false,
  data: null,
  error: false,
};

export default (
  state = initialState,
  action: GetAllValuatorAction,
): GetAllValuatorState => {
  switch (action.type) {
    case GET_ALL_VALUATORS:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const getAllValuatorAction = (
  res: GetAllValuatorState,
): GetAllValuatorAction => {
  return {type: GET_ALL_VALUATORS, payload: {...res, called: true}};
};

export const onGetAllValuator = () => async (dispatch: AppDispatch) => {
  const url = GET_ALL_VALUATORS_LIST;
  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axiosInstance
    .get(url, config)
    .then(res => {
      dispatch(getAllValuatorAction({...res.data, error: false}));
    })
    .catch(err => {
      handleError(err, dispatch);
      if (err?.request?._response) {
        dispatch(
          getAllValuatorAction({
            ...JSON.parse(err.request._response),
            error: true,
          }),
        );
      }
    });
};
