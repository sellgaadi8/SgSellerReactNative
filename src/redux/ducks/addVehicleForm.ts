import axiosInstance from '../../axios';
import {addVehicleFormurl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ADD_VEHICLE_FORM: ADD_VEHICLE_FORM = 'sgSeller/addForm';

const initialState: AddVehicleFormState = {
  error: false,
  called: false,
  success: false,
  data: null,
};

export default (
  state = initialState,
  action: AddVehicleFormAction,
): AddVehicleFormState => {
  switch (action.type) {
    case ADD_VEHICLE_FORM:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const addVehicleFormAction = (
  res: AddVehicleFormState,
): AddVehicleFormAction => {
  return {type: ADD_VEHICLE_FORM, payload: {...res, called: true}};
};

export const getVehicleForm = (id: string) => async (dispatch: AppDispatch) => {
  const url = addVehicleFormurl(id);

  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axiosInstance
    .get(url, config)
    .then(res => {
      dispatch(addVehicleFormAction({...res.data, error: false}));
    })
    .catch(err => {
      if (err?.request?._repsonse) {
        dispatch(
          addVehicleFormAction({
            ...JSON.parse(err.request._repsonse),
            error: true,
          }),
        );
      }
    });
};
