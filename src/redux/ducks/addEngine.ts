import axiosInstance from '../../axios';
import {addEngineUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
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
    gear_oil_leakage_image: string,
    exhaust_smoke_image: string,
    engine_sound_video: string,
    engine_coolant_level: string,
    engine_oil_level: string,
    chain_belt_assembly: string,
    overall_rating: number,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = addEngineUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    if (gear_oil_leakage && gear_oil_leakage.length !== 0) {
      body.append('gear_oil_leakage', gear_oil_leakage);
    }

    if (exhaust_smoke && exhaust_smoke.length !== 0) {
      body.append('exhaust_smoke', exhaust_smoke);
    }

    if (engine_perm_blow_back && engine_perm_blow_back.length !== 0) {
      body.append('engine_perm_blow_back', engine_perm_blow_back);
    }

    if (engine_mounting && engine_mounting.length !== 0) {
      body.append('engine_mounting', engine_mounting);
    }

    if (engine_sound && engine_sound.length !== 0) {
      body.append('engine_sound', engine_sound);
    }

    if (clutch_bearing_sound && clutch_bearing_sound.length !== 0) {
      body.append('clutch_bearing_sound', clutch_bearing_sound);
    }

    if (ac && ac.length !== 0) {
      body.append('ac', ac);
    }

    if (cooling && cooling.length !== 0) {
      body.append('cooling', cooling);
    }

    if (heater && heater.length !== 0) {
      body.append('heater', heater);
    }

    if (condensor && condensor.length !== 0) {
      body.append('condensor', condensor);
    }

    if (gear_oil_leakage_image && gear_oil_leakage_image.length !== 0) {
      body.append('gear_oil_leakage_image', gear_oil_leakage_image);
    }

    if (exhaust_smoke_image && exhaust_smoke_image.length !== 0) {
      body.append('exhaust_smoke_image', exhaust_smoke_image);
    }

    if (engine_sound_video && engine_sound_video.length !== 0) {
      body.append('engine_sound_video', engine_sound_video);
    }

    if (engine_coolant_level && engine_coolant_level.length !== 0) {
      body.append('engine_coolant_level', engine_coolant_level);
    }

    if (engine_oil_level && engine_oil_level.length !== 0) {
      body.append('engine_oil_level', engine_oil_level);
    }

    if (chain_belt_assembly && chain_belt_assembly.length !== 0) {
      body.append('chain_belt_assembly', chain_belt_assembly);
    }

    if (overall_rating) {
      body.append('overall_rating', overall_rating);
    }

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(addEngineAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            addEngineAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
