import axiosInstance from '../../axios';
import {getSteeringUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_STEERING: GET_STEERING = 'sgSeller/getSteering';

const initialState: GetSteeringState = {
  called: false,
  success: false,
  error: false,
  data: null,
};

export default (
  state = initialState,
  action: GetSteeringAction,
): GetSteeringState => {
  switch (action.type) {
    case GET_STEERING:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const getSteeringAction = (res: GetSteeringState): GetSteeringAction => {
  return {type: GET_STEERING, payload: {...res, called: true}};
};

export const onGetSteeringDetails =
  (id: string) => async (dispatch: AppDispatch) => {
    const url = getSteeringUrl(id);
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axiosInstance
      .get(url, config)
      .then(res => {
        dispatch(getSteeringAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._repsonse) {
          dispatch(
            getSteeringAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
