import axiosInstance from '../../axios';
import {VEHICLE} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const VEHICLE_LIST: VEHICLE_LIST = 'sgSeller/vehicleList';

const initialState: VehicleListState = {
  called: false,
  success: false,
  data: null,
  error: false,
};

export default (
  state = initialState,
  action: VehicleListAction,
): VehicleListState => {
  switch (action.type) {
    case VEHICLE_LIST:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const vehicleListAction = (res: VehicleListState): VehicleListAction => {
  return {type: VEHICLE_LIST, payload: {...res, called: true}};
};

export const onGetVehicleList = () => async (dispatch: AppDispatch) => {
  const url = VEHICLE;
  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axiosInstance
    .get(url, config)
    .then(res => {
      dispatch(vehicleListAction({...res.data, error: false}));
    })
    .catch(err => {
      if (err?.request?._repsonse) {
        dispatch(
          vehicleListAction({
            ...JSON.parse(err.request._repsonse),
            error: true,
          }),
        );
      }
    });
};
