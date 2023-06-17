import axiosInstance from '../../axios';
import {updateElectricalUrl} from '../../utils/api';
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

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateElectricalAction({...res.data, error: false}));
      })
      .catch(err => {
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
