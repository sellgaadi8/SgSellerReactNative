import axiosInstance from '../../axios';
import {getEngineUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_ENGINE_DETAILS: GET_ENGINE_DETAILS = 'sgSeller/getEngineDetails';

const initialState: GetEngineDetailsState = {
  called: false,
  success: false,
  error: false,
  data: null,
};

export default (
  state = initialState,
  action: GetEngineDetailsAction,
): GetEngineDetailsState => {
  switch (action.type) {
    case GET_ENGINE_DETAILS:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const getEngineDetailsAction = (
  res: GetEngineDetailsState,
): GetEngineDetailsAction => {
  return {type: GET_ENGINE_DETAILS, payload: {...res, called: true}};
};

export const onGetEngineDetails =
  (id: string) => async (dispatch: AppDispatch) => {
    const url = getEngineUrl(id);
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axiosInstance
      .get(url, config)
      .then(res => {
        dispatch(getEngineDetailsAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._repsonse) {
          dispatch(
            getEngineDetailsAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
