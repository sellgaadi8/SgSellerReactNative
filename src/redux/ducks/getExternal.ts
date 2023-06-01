import axiosInstance from '../../axios';
import {getExternelUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_EXTERNAL: GET_EXTERNAL = 'sgSeller/getExternal';

const initialState: GetExternalState = {
  called: false,
  success: false,
  error: false,
  data: null,
};

export default (
  state = initialState,
  action: GetExternalAction,
): GetExternalState => {
  switch (action.type) {
    case GET_EXTERNAL:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const getExternalAction = (res: GetExternalState): GetExternalAction => {
  return {type: GET_EXTERNAL, payload: {...res, called: true}};
};

export const onGetCarImages = (id: string) => async (dispatch: AppDispatch) => {
  const url = getExternelUrl(id);
  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axiosInstance
    .get(url, config)
    .then(res => {
      dispatch(getExternalAction({...res.data, error: false}));
    })
    .catch(err => {
      if (err?.request?._repsonse) {
        dispatch(
          getExternalAction({
            ...JSON.parse(err.request._repsonse),
            error: true,
          }),
        );
      }
    });
};
