import axiosInstance from '../../axios';
import {updateExternelUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_EXTERNAL: UPDATE_EXTERNAL = 'sgSeller/updateExternal';

const initialState: UpdateExternalState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: UpdateExternalAction,
): UpdateExternalState => {
  switch (action.type) {
    case UPDATE_EXTERNAL:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateExternalAction = (
  res: UpdateExternalState,
): UpdateExternalAction => {
  return {type: UPDATE_EXTERNAL, payload: {...res, called: true}};
};

export const onUpdateExternal =
  (
    id: string,
    bonnet_head: string,
    roof: string,
    dickey_door: string,
    left_door_front: string,
    left_door_back: string,
    right_door_front: string,
    right_door_back: string,
    left_fender: string,
    right_fender: string,
    left_quater_panel: string,
    right_quater_panel: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = updateExternelUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    body.append('bonnet_head', bonnet_head);
    body.append('roof', roof);
    body.append('dickey_door', dickey_door);
    body.append('left_door_front', left_door_front);
    body.append('left_door_back', left_door_back);
    body.append('right_door_front', right_door_front);
    body.append('right_door_back', right_door_back);
    body.append('left_fender', left_fender);
    body.append('right_fender', right_fender);
    body.append('left_quater_panel', left_quater_panel);
    body.append('right_quater_panel', right_quater_panel);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateExternalAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            updateExternalAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };