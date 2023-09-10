import axiosInstance from '../../axios';
import {addElectricalsUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ADD_ELECTRICAL: ADD_ELECTRICAL = 'sgSeller/addElectrical';

const initialState: AddElectricalState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: AddElectricalAction,
): AddElectricalState => {
  switch (action.type) {
    case ADD_ELECTRICAL:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const addElectricalAction = (res: AddElectricalState): AddElectricalAction => {
  return {type: ADD_ELECTRICAL, payload: {...res, called: true}};
};

export const onAddElectrical =
  (
    id: string,
    power_windows: string,
    music_system: string,
    electrical_odomoter: string,
    parking_sensor: string,
    overall: string,
    jack_tool_box: string,
    lights_crack_broken: string,
    power_windows_image: string,
    music_system_image: string,
    electrical_odomoter_image: string,
    parking_sensor_image: string,
    overall_image: string,
    jack_tool_box_image: string,
    lights_crack_broken_image: string,
    headlight: string,
    tailLight: string,
    brakeLight: string,
    front_turn_indicator: string,
    rear_turn_indicator: string,
    ignition_switch: string,
    indicator_switch: string,
    horn: string,
    headlight_switch: string,
    passing_light_switch: string,
    self_starter_switch: string,
    high_low_beam_switch: string,
    instrument_cluster: string,
    battery: string,
    lockset: string,
    headlight_image: string,
    tailLight_image: string,
    brakeLight_image: string,
    front_turn_indicator_image: string,
    rear_turn_indicator_image: string,
    ignition_switch_image: string,
    indicator_switch_image: string,
    horn_image: string,
    headlight_switch_image: string,
    passing_light_switch_image: string,
    self_starter_switch_image: string,
    high_low_beam_switch_image: string,
    instrument_cluster_image: string,
    battery_image: string,
    lockset_image: string,
    overall_rating: number,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = addElectricalsUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    if (power_windows && power_windows.length !== 0) {
      body.append('power_windows', power_windows);
    }

    if (music_system && music_system.length !== 0) {
      body.append('music_system', music_system);
    }

    if (electrical_odomoter && electrical_odomoter.length !== 0) {
      body.append('electrical_odomoter', electrical_odomoter);
    }

    if (parking_sensor && parking_sensor.length !== 0) {
      body.append('parking_sensor', parking_sensor);
    }

    if (overall && overall.length !== 0) {
      body.append('overall', overall);
    }

    if (jack_tool_box && jack_tool_box.length !== 0) {
      body.append('jack_tool_box', jack_tool_box);
    }

    if (lights_crack_broken && lights_crack_broken.length !== 0) {
      body.append('lights_crack_broken', lights_crack_broken);
    }

    if (power_windows_image && power_windows_image.length !== 0) {
      body.append('power_windows_image', power_windows_image);
    }

    if (music_system_image && music_system_image.length !== 0) {
      body.append('music_system_image', music_system_image);
    }

    if (electrical_odomoter_image && electrical_odomoter_image.length !== 0) {
      body.append('electrical_odomoter_image', electrical_odomoter_image);
    }

    if (parking_sensor_image && parking_sensor_image.length !== 0) {
      body.append('parking_sensor_image', parking_sensor_image);
    }

    if (overall_image && overall_image.length !== 0) {
      body.append('overall_image', overall_image);
    }

    if (jack_tool_box_image && jack_tool_box_image.length !== 0) {
      body.append('jack_tool_box_image', jack_tool_box_image);
    }

    if (lights_crack_broken_image && lights_crack_broken_image.length !== 0) {
      body.append('lights_crack_broken_image', lights_crack_broken_image);
    }

    if (headlight && headlight.length !== 0) {
      body.append('headlight', headlight);
    }

    if (tailLight && tailLight.length !== 0) {
      body.append('tailLight', tailLight);
    }

    if (brakeLight && brakeLight.length !== 0) {
      body.append('brakeLight', brakeLight);
    }

    if (front_turn_indicator && front_turn_indicator.length !== 0) {
      body.append('front_turn_indicator', front_turn_indicator);
    }

    if (rear_turn_indicator && rear_turn_indicator.length !== 0) {
      body.append('rear_turn_indicator', rear_turn_indicator);
    }

    if (ignition_switch && ignition_switch.length !== 0) {
      body.append('ignition_switch', ignition_switch);
    }

    if (indicator_switch && indicator_switch.length !== 0) {
      body.append('indicator_switch', indicator_switch);
    }

    if (horn && horn.length !== 0) {
      body.append('horn', horn);
    }

    if (headlight_switch && headlight_switch.length !== 0) {
      body.append('headlight_switch', headlight_switch);
    }

    if (passing_light_switch && passing_light_switch.length !== 0) {
      body.append('passing_light_switch', passing_light_switch);
    }

    if (self_starter_switch && self_starter_switch.length !== 0) {
      body.append('self_starter_switch', self_starter_switch);
    }

    if (high_low_beam_switch && high_low_beam_switch.length !== 0) {
      body.append('high_low_beam_switch', high_low_beam_switch);
    }

    if (instrument_cluster && instrument_cluster.length !== 0) {
      body.append('instrument_cluster', instrument_cluster);
    }

    if (battery && battery.length !== 0) {
      body.append('battery', battery);
    }

    if (lockset && lockset.length !== 0) {
      body.append('lockset', lockset);
    }

    if (headlight_image && headlight_image.length !== 0) {
      body.append('headlight_image', headlight_image);
    }

    if (tailLight_image && tailLight_image.length !== 0) {
      body.append('tailLight_image', tailLight_image);
    }

    if (brakeLight_image && brakeLight_image.length !== 0) {
      body.append('brakeLight_image', brakeLight_image);
    }

    if (front_turn_indicator_image && front_turn_indicator_image.length !== 0) {
      body.append('front_turn_indicator_image', front_turn_indicator_image);
    }

    if (rear_turn_indicator_image && rear_turn_indicator_image.length !== 0) {
      body.append('rear_turn_indicator_image', rear_turn_indicator_image);
    }

    if (ignition_switch_image && ignition_switch_image.length !== 0) {
      body.append('ignition_switch_image', ignition_switch_image);
    }

    if (indicator_switch_image && indicator_switch_image.length !== 0) {
      body.append('indicator_switch_image', indicator_switch_image);
    }

    if (horn_image && horn_image.length !== 0) {
      body.append('horn_image', horn_image);
    }

    if (headlight_switch_image && headlight_switch_image.length !== 0) {
      body.append('headlight_switch_image', headlight_switch_image);
    }

    if (passing_light_switch_image && passing_light_switch_image.length !== 0) {
      body.append('passing_light_switch_image', passing_light_switch_image);
    }

    if (self_starter_switch_image && self_starter_switch_image.length !== 0) {
      body.append('self_starter_switch_image', self_starter_switch_image);
    }

    if (high_low_beam_switch_image && high_low_beam_switch_image.length !== 0) {
      body.append('high_low_beam_switch_image', high_low_beam_switch_image);
    }

    if (instrument_cluster_image && instrument_cluster_image.length !== 0) {
      body.append('instrument_cluster_image', instrument_cluster_image);
    }

    if (battery_image && battery_image.length !== 0) {
      body.append('battery_image', battery_image);
    }

    if (lockset_image && lockset_image.length !== 0) {
      body.append('lockset_image', lockset_image);
    }

    if (overall_rating) {
      body.append('overall_rating', overall_rating);
    }

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(addElectricalAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            addElectricalAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
