import axiosInstance from '../../axios';
import {getTyresUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_TYRES: GET_TYRES = 'sgSeller/getTyres';

const initialState: GetTyresState = {
  called: false,
  success: false,
  error: false,
  data: null,
};

export default (
  state = initialState,
  action: GetTyresAction,
): GetTyresState => {
  switch (action.type) {
    case GET_TYRES:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const getTyresAction = (res: GetTyresState): GetTyresAction => {
  return {type: GET_TYRES, payload: {...res, called: true}};
};

export const onGetTyresDetails =
  (id: string) => async (dispatch: AppDispatch) => {
    const url = getTyresUrl(id);
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axiosInstance
      .get(url, config)
      .then(res => {
        dispatch(getTyresAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            getTyresAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
