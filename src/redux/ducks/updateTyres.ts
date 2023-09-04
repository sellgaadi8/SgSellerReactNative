import axiosInstance from '../../axios';
import {updateTyresUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
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
    lhs_front_image: string,
    rhs_front_image: string,
    lhs_back_image: string,
    rhs_back_image: string,
    spare_image: string,
    front_wheel_condition: string,
    rear_wheel_condition: string,
    front_wheel_condition_image: string,
    rear_wheel_condition_image: string,
    overall_rating: number,
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
    body.append('lhs_front_image', lhs_front_image);
    body.append('rhs_front_image', rhs_front_image);
    body.append('lhs_back_image', lhs_back_image);
    body.append('rhs_back_image', rhs_back_image);
    body.append('spare_image', spare_image);
    body.append('front_wheel_condition', front_wheel_condition);
    body.append('rear_wheel_condition', rear_wheel_condition);
    body.append('front_wheel_condition_image', front_wheel_condition_image);
    body.append('rear_wheel_condition_image', rear_wheel_condition_image);
    body.append('overall_rating', overall_rating);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateTyresAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
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
