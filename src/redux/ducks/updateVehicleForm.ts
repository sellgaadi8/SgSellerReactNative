import axiosInstance from '../../axios';
import {addVehicleFormurl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_VEHICLE_FORM: UPDATE_VEHICLE_FORM = 'sgSeller/updateForm';

const initialState: UpdateVehicleFormState = {
  error: false,
  called: false,
  success: false,
  data: null,
};

export default (
  state = initialState,
  action: UpdateVehicleFormAction,
): UpdateVehicleFormState => {
  switch (action.type) {
    case UPDATE_VEHICLE_FORM:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateVehicleFormAction = (
  res: UpdateVehicleFormState,
): UpdateVehicleFormAction => {
  return {type: UPDATE_VEHICLE_FORM, payload: {...res, called: true}};
};

export const onUpdateVehicleForm =
  (id: string) => async (dispatch: AppDispatch) => {
    console.log('id');

    const url = updateVehicleFormurl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axiosInstance
      .get(url, config)
      .then(res => {
        dispatch(updateVehicleFormAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            updateVehicleFormAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
