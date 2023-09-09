import axiosInstance from '../../axios';
import {getDisplayInfoUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const EDIT_DISPLAY_INFO: EDIT_DISPLAY_INFO = 'sgSeller/editDisplay';

const initialState: EditDisplayInfoState = {
  error: false,
  called: false,
  success: false,
  data: null,
};

export default (
  state = initialState,
  action: EditDisplayInfoAction,
): EditDisplayInfoState => {
  switch (action.type) {
    case EDIT_DISPLAY_INFO:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const editDisplayInfoAction = (
  res: EditDisplayInfoState,
): EditDisplayInfoAction => {
  return {type: EDIT_DISPLAY_INFO, payload: {...res, called: true}};
};

export const getDisplayInfo = (id: string) => async (dispatch: AppDispatch) => {
  const url = getDisplayInfoUrl(id);

  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axiosInstance
    .get(url, config)
    .then(res => {
      dispatch(editDisplayInfoAction({...res.data, error: false}));
    })
    .catch(err => {
      handleError(err, dispatch);
      if (err?.request?._response) {
        dispatch(
          editDisplayInfoAction({
            ...JSON.parse(err.request._response),
            error: true,
          }),
        );
      }
    });
};
