import axiosInstance from '../../axios';
import {addEngineUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ADD_ENGINE: ADD_ENGINE = 'sgSeller/addEngine';

const initialState: AddEngineState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: AddEngineAction,
): AddEngineState => {
  switch (action.type) {
    case ADD_ENGINE:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const addEngineAction = (res: AddEngineState): AddEngineAction => {
  return {type: ADD_ENGINE, payload: {...res, called: true}};
};

export const onAddEngine =
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
    const url = addEngineUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
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
        dispatch(addEngineAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            addEngineAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
