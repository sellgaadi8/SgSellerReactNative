import axiosInstance from '../../axios';
import {updateElectricalUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_ELECTRICAL: UPDATE_ELECTRICAL = 'sgSeller/updateElectrical';

const initialState: UpdateElectricalState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: UpdateElectricalAction,
): UpdateElectricalState => {
  switch (action.type) {
    case UPDATE_ELECTRICAL:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateElectricalAction = (
  res: UpdateElectricalState,
): UpdateElectricalAction => {
  return {type: UPDATE_ELECTRICAL, payload: {...res, called: true}};
};

export const onUpdateElectrical =
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
    const url = updateElectricalUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    body.append('power_windows', power_windows);
    body.append('music_system', music_system);
    body.append('electrical_odomoter', electrical_odomoter);
    body.append('parking_sensor', parking_sensor);
    body.append('overall', overall);
    body.append('jack_tool_box', jack_tool_box);
    body.append('lights_crack_broken', lights_crack_broken);
    body.append('power_windows_image', power_windows_image);
    body.append('music_system_image', music_system_image);
    body.append('electrical_odomoter_image', electrical_odomoter_image);
    body.append('parking_sensor_image', parking_sensor_image);
    body.append('overall_image', overall_image);
    body.append('jack_tool_box_image', jack_tool_box_image);
    body.append('lights_crack_broken_image', lights_crack_broken_image);
    body.append('headlight', headlight);
    body.append('tailLight', tailLight);
    body.append('brakeLight', brakeLight);
    body.append('front_turn_indicator', front_turn_indicator);
    body.append('rear_turn_indicator', rear_turn_indicator);
    body.append('ignition_switch', ignition_switch);
    body.append('indicator_switch', indicator_switch);
    body.append('horn', horn);
    body.append('headlight_switch', headlight_switch);
    body.append('passing_light_switch', passing_light_switch);
    body.append('self_starter_switch', self_starter_switch);
    body.append('high_low_beam_switch', high_low_beam_switch);
    body.append('instrument_cluster', instrument_cluster);
    body.append('battery', battery);
    body.append('lockset', lockset);
    body.append('headlight_image', headlight_image);
    body.append('tailLight_image', tailLight_image);
    body.append('brakeLight_image', brakeLight_image);
    body.append('front_turn_indicator_image', front_turn_indicator_image);
    body.append('rear_turn_indicator_image', rear_turn_indicator_image);
    body.append('ignition_switch_image', ignition_switch_image);
    body.append('indicator_switch_image', indicator_switch_image);
    body.append('horn_image', horn_image);
    body.append('headlight_switch_image', headlight_switch_image);
    body.append('passing_light_switch_image', passing_light_switch_image);
    body.append('self_starter_switch_image', self_starter_switch_image);
    body.append('high_low_beam_switch_image', high_low_beam_switch_image);
    body.append('instrument_cluster_image', instrument_cluster_image);
    body.append('battery_image', battery_image);
    body.append('lockset_image', lockset_image);
    body.append('overall_rating', overall_rating);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateElectricalAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._repsonse) {
          dispatch(
            updateElectricalAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
