import axiosInstance from '../../axios';
import {getExteriorUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_EXTERIOR: GET_EXTERIOR = 'sgSeller/getExterior';

const initialState: GetExteriorState = {
  called: false,
  success: false,
  error: false,
  data: null,
};

export default (
  state = initialState,
  action: GetExteriorAction,
): GetExteriorState => {
  switch (action.type) {
    case GET_EXTERIOR:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const getExteriorAction = (res: GetExteriorState): GetExteriorAction => {
  return {type: GET_EXTERIOR, payload: {...res, called: true}};
};

export const onGetCarImages = (id: string) => async (dispatch: AppDispatch) => {
  const url = getExteriorUrl(id);
  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axiosInstance
    .get(url, config)
    .then(res => {
      dispatch(getExteriorAction({...res.data, error: false}));
    })
    .catch(err => {
      if (err?.request?._repsonse) {
        dispatch(
          getExteriorAction({
            ...JSON.parse(err.request._repsonse),
            error: true,
          }),
        );
      }
    });
};
