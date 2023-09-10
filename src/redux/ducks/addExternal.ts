import axiosInstance from '../../axios';
import {addExternelUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ADD_EXTERNAL: ADD_EXTERNAL = 'sgSeller/addExternal';

const initialState: AddExternalState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: AddExternalAction,
): AddExternalState => {
  switch (action.type) {
    case ADD_EXTERNAL:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const addExternalAction = (res: AddExternalState): AddExternalAction => {
  return {type: ADD_EXTERNAL, payload: {...res, called: true}};
};

export const onAddExternal =
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
    bonnet_head_image: string,
    roof_image: string,
    dickey_door_image: string,
    left_door_front_image: string,
    left_door_back_image: string,
    right_door_front_image: string,
    right_door_back_image: string,
    left_fender_image: string,
    right_fender_image: string,
    left_quater_panel_image: string,
    right_quater_panel_image: string,
    overall_rating: number,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = addExternelUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    if (bonnet_head && bonnet_head.length !== 0) {
      body.append('bonnet_head', bonnet_head);
    }
    if (roof && roof.length !== 0) {
      body.append('roof', roof);
    }

    if (dickey_door && dickey_door.length !== 0) {
      body.append('dickey_door', dickey_door);
    }

    if (left_door_front && left_door_front.length !== 0) {
      body.append('left_door_front', left_door_front);
    }

    if (left_door_back && left_door_back.length !== 0) {
      body.append('left_door_back', left_door_back);
    }

    if (right_door_front && right_door_front.length !== 0) {
      body.append('right_door_front', right_door_front);
    }

    if (right_door_back && right_door_back.length !== 0) {
      body.append('right_door_back', right_door_back);
    }

    if (left_fender && left_fender.length !== 0) {
      body.append('left_fender', left_fender);
    }

    if (right_fender && right_fender.length !== 0) {
      body.append('right_fender', right_fender);
    }

    if (left_quater_panel && left_quater_panel.length !== 0) {
      body.append('left_quater_panel', left_quater_panel);
    }

    if (right_quater_panel && right_quater_panel.length !== 0) {
      body.append('right_quater_panel', right_quater_panel);
    }

    if (bonnet_head_image && bonnet_head_image.length !== 0) {
      body.append('bonnet_head_image', bonnet_head_image);
    }

    if (roof_image && roof_image.length !== 0) {
      body.append('roof_image', roof_image);
    }

    if (dickey_door_image && dickey_door_image.length !== 0) {
      body.append('dickey_door_image', dickey_door_image);
    }

    if (left_door_front_image && left_door_front_image.length !== 0) {
      body.append('left_door_front_image', left_door_front_image);
    }

    if (left_door_back_image && left_door_back_image.length !== 0) {
      body.append('left_door_back_image', left_door_back_image);
    }

    if (right_door_front_image && right_door_front_image.length !== 0) {
      body.append('right_door_front_image', right_door_front_image);
    }

    if (right_door_back_image && right_door_back_image.length !== 0) {
      body.append('right_door_back_image', right_door_back_image);
    }

    if (left_fender_image && left_fender_image.length !== 0) {
      body.append('left_fender_image', left_fender_image);
    }

    if (right_fender_image && right_fender_image.length !== 0) {
      body.append('right_fender_image', right_fender_image);
    }

    if (left_quater_panel_image && left_quater_panel_image.length !== 0) {
      body.append('left_quater_panel_image', left_quater_panel_image);
    }

    if (right_quater_panel_image && right_quater_panel_image.length !== 0) {
      body.append('right_quater_panel_image', right_quater_panel_image);
    }

    if (overall_rating) {
      body.append('overall_rating', overall_rating);
    }

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(addExternalAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            addExternalAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
