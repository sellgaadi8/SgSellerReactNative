import axiosInstance from '../../axios';
import {updateEngineUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
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
    gear_oil_leakage_image: string,
    exhaust_smoke_image: string,
    engine_sound_video: string,
    engine_coolant_level: string,
    engine_oil_level: string,
    chain_belt_assembly: string,
    overall_rating: number,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = updateEngineUrl(id);

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
    body.append('gear_oil_leakage_image', gear_oil_leakage_image);
    body.append('exhaust_smoke_image', exhaust_smoke_image);
    body.append('engine_sound_video', engine_sound_video);
    body.append('engine_coolant_level', engine_coolant_level);
    body.append('engine_oil_level', engine_oil_level);
    body.append('chain_belt_assembly', chain_belt_assembly);
    body.append('overall_rating', overall_rating);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateEngineAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
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
