import axiosInstance from '../../axios';
import {getCarImageUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_CAR_IAMGES: GET_CAR_IAMGES = 'sgSeller/getCarImages';

const initialState: GetCarImageState = {
  called: false,
  success: false,
  error: false,
  data: null,
};

export default (
  state = initialState,
  action: GetCarImageAction,
): GetCarImageState => {
  switch (action.type) {
    case GET_CAR_IAMGES:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const getCarImageAction = (res: GetCarImageState): GetCarImageAction => {
  return {type: GET_CAR_IAMGES, payload: {...res, called: true}};
};

export const onGetCarImages = (id: string) => async (dispatch: AppDispatch) => {
  const url = getCarImageUrl(id);
  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axiosInstance
    .get(url, config)
    .then(res => {
      dispatch(getCarImageAction({...res.data, error: false}));
    })
    .catch(err => {
      handleError(err, dispatch);
      if (err?.request?._repsonse) {
        dispatch(
          getCarImageAction({
            ...JSON.parse(err.request._repsonse),
            error: true,
          }),
        );
      }
    });
};
