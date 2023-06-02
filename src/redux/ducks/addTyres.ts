import axiosInstance from '../../axios';
import {addTyresUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ADD_TYRES: ADD_TYRES = 'sgSeller/addTyres';

const initialState: AddTyresState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: AddTyresAction,
): AddTyresState => {
  switch (action.type) {
    case ADD_TYRES:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const addTyresAction = (res: AddTyresState): AddTyresAction => {
  return {type: ADD_TYRES, payload: {...res, called: true}};
};

export const onAddTyres =
  (
    id: string,
    lhs_front_type: string,
    rhs_front_type: string,
    lhs_back_type: string,
    rhs_back_type: string,
    spare_type: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = addTyresUrl(id);

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
        dispatch(addTyresAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            addTyresAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
