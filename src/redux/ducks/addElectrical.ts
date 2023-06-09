import axiosInstance from '../../axios';
import {addElectricalsUrl} from '../../utils/api';
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
  ) =>
  async (dispatch: AppDispatch) => {
    const url = addElectricalsUrl(id);

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

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(addElectricalAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            addElectricalAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
