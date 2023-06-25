import axiosInstance from '../../axios';
import {getSuspension} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_SUSPENSION: GET_SUSPENSION = 'sgSeller/getSuspension';

const initialState: GetSuspensionState = {
  called: false,
  success: false,
  error: false,
  data: null,
};

export default (
  state = initialState,
  action: GetSuspensionAction,
): GetSuspensionState => {
  switch (action.type) {
    case GET_SUSPENSION:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const getSuspensionAction = (res: GetSuspensionState): GetSuspensionAction => {
  return {type: GET_SUSPENSION, payload: {...res, called: true}};
};

export const onGetSuspensionDetails =
  (id: string) => async (dispatch: AppDispatch) => {
    const url = getSuspension(id);
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axiosInstance
      .get(url, config)
      .then(res => {
        dispatch(getSuspensionAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._repsonse) {
          dispatch(
            getSuspensionAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
