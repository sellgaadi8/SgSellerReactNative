import axiosInstance from '../../axios';
import {UPDATE_STATUS_URL} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_STATUS: UPDATE_STATUS = 'sgSeller/updateStatus';

const initialState: UpdateStatusState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: UpdateStatusAction,
): UpdateStatusState => {
  switch (action.type) {
    case UPDATE_STATUS:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateStatusAction = (res: UpdateStatusState): UpdateStatusAction => {
  return {type: UPDATE_STATUS, payload: {...res, called: true}};
};

export const onUpdateStatus =
  (id: string, status: string, starting_price: string, closing_price: string) =>
  async (dispatch: AppDispatch) => {
    const url = UPDATE_STATUS_URL;

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    let body = JSON.stringify({
      status: status,
      starting_price: starting_price,
      closing_price: closing_price,
      id: id,
    });

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateStatusAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._repsonse) {
          dispatch(
            updateStatusAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
