import axiosInstance from '../../axios';
import {getElectricalUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_ELECTRICAL_DETAILS: GET_ELECTRICAL_DETAILS =
  'sgSeller/getElectricalDetails';

const initialState: GetElectricalState = {
  called: false,
  success: false,
  error: false,
  data: null,
};

export default (
  state = initialState,
  action: GetElectricalDetailsAction,
): GetElectricalState => {
  switch (action.type) {
    case GET_ELECTRICAL_DETAILS:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const getElectricalDetailsAction = (
  res: GetElectricalState,
): GetElectricalDetailsAction => {
  return {type: GET_ELECTRICAL_DETAILS, payload: {...res, called: true}};
};

export const onGetElectricalDetails =
  (id: string) => async (dispatch: AppDispatch) => {
    const url = getElectricalUrl(id);
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axiosInstance
      .get(url, config)
      .then(res => {
        dispatch(getElectricalDetailsAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            getElectricalDetailsAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
