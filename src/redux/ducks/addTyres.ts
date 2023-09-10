import axiosInstance from '../../axios';
import {addTyresUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
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
    const url = addTyresUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    if (lhs_front_type && lhs_front_type.length !== 0) {
      body.append('lhs_front_type', lhs_front_type);
    }

    if (rhs_front_type && rhs_front_type.length !== 0) {
      body.append('rhs_front_type', rhs_front_type);
    }

    if (lhs_back_type && lhs_back_type.length !== 0) {
      body.append('lhs_back_type', lhs_back_type);
    }

    if (rhs_back_type && rhs_back_type.length !== 0) {
      body.append('rhs_back_type', rhs_back_type);
    }

    if (spare_type && spare_type.length !== 0) {
      body.append('spare_type', spare_type);
    }

    if (lhs_front_image && lhs_front_image.length !== 0) {
      body.append('lhs_front_image', lhs_front_image);
    }

    if (rhs_front_image && rhs_front_image.length !== 0) {
      body.append('rhs_front_image', rhs_front_image);
    }

    if (lhs_back_image && lhs_back_image.length !== 0) {
      body.append('lhs_back_image', lhs_back_image);
    }

    if (rhs_back_image && rhs_back_image.length !== 0) {
      body.append('rhs_back_image', rhs_back_image);
    }

    if (spare_image && spare_image.length !== 0) {
      body.append('spare_image', spare_image);
    }

    if (front_wheel_condition && front_wheel_condition.length !== 0) {
      body.append('front_wheel_condition', front_wheel_condition);
    }

    if (rear_wheel_condition && rear_wheel_condition.length !== 0) {
      body.append('rear_wheel_condition', rear_wheel_condition);
    }

    if (
      front_wheel_condition_image &&
      front_wheel_condition_image.length !== 0
    ) {
      body.append('front_wheel_condition_image', front_wheel_condition_image);
    }

    if (rear_wheel_condition_image && rear_wheel_condition_image.length !== 0) {
      body.append('rear_wheel_condition_image', rear_wheel_condition_image);
    }

    if (overall_rating) {
      body.append('overall_rating', overall_rating);
    }

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(addTyresAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            addTyresAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
