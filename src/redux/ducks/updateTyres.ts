import axiosInstance from '../../axios';
import {updateTyresUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_TYRES: UPDATE_TYRES = 'sgSeller/updateTyres';

const initialState: UpdateTyresState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: UpdateTyresAction,
): UpdateTyresState => {
  switch (action.type) {
    case UPDATE_TYRES:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateTyresAction = (res: UpdateTyresState): UpdateTyresAction => {
  return {type: UPDATE_TYRES, payload: {...res, called: true}};
};

export const onUpdateTyres =
  (
    id: string,
    lhs_front_type: string,
    rhs_front_type: string,
    lhs_back_type: string,
    rhs_back_type: string,
    spare_type: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = updateTyresUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    body.append('lhs_front_type', lhs_front_type);
    body.append('rhs_front_type', rhs_front_type);
    body.append('lhs_back_type', lhs_back_type);
    body.append('rhs_back_type', rhs_back_type);
    body.append('spare_type', spare_type);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateTyresAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            updateTyresAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
