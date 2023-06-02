import axiosInstance from '../../axios';
import {updateEngineUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_ENGINE: UPDATE_ENGINE = 'sgSeller/updateEngine';

const initialState: UpdateEngineState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: UpdateEngineAction,
): UpdateEngineState => {
  switch (action.type) {
    case UPDATE_ENGINE:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateEngineAction = (res: UpdateEngineState): UpdateEngineAction => {
  return {type: UPDATE_ENGINE, payload: {...res, called: true}};
};

export const onUpdateEngine =
  (
    id: string,
    gear_oil_leakage: string,
    exhaust_smoke: string,
    engine_perm_blow_back: string,
    engine_mounting: string,
    engine_sound: string,
    clutch_bearing_sound: string,
    ac: string,
    cooling: string,
    heater: string,
    condensor: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = updateEngineUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    body.append('gear_oil_leakage', gear_oil_leakage);
    body.append('exhaust_smoke', exhaust_smoke);
    body.append('engine_perm_blow_back', engine_perm_blow_back);
    body.append('engine_mounting', engine_mounting);
    body.append('engine_sound', engine_sound);
    body.append('clutch_bearing_sound', clutch_bearing_sound);
    body.append('ac', ac);
    body.append('cooling', cooling);
    body.append('heater', heater);
    body.append('condensor', condensor);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateEngineAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            updateEngineAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
