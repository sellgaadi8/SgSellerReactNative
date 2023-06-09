import axiosInstance from '../../axios';
import {updateCarImageUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_CAR_IMAGES: UPDATE_CAR_IMAGES = 'sgSeller/updateCarImage';

const initialState: UpdateCarImageState = {
  called: false,
  success: false,
  error: false,
  message: '',
  uuid: '',
};

export default (
  state = initialState,
  action: UpdateCarImageAction,
): UpdateCarImageState => {
  switch (action.type) {
    case UPDATE_CAR_IMAGES:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateCarImageAction = (
  res: UpdateCarImageState,
): UpdateCarImageAction => {
  return {type: UPDATE_CAR_IMAGES, payload: {...res, called: true}};
};

export const onUpdateCarImages =
  (
    id: string,
    left_wheel_corner_front: string,
    centre_front: string,
    right_corner_back: string,
    centre_back: string,
    engine_hood_open: string,
    interior_dashboard: string,
    meter_console: string,
    video: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = updateCarImageUrl(id);
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
    };

    const body = new FormData();
    body.append('left_wheel_corner_front', left_wheel_corner_front);
    body.append('centre_front', centre_front);
    body.append('right_corner_back', right_corner_back);
    body.append('centre_back', centre_back);
    body.append('engine_hood_open', engine_hood_open);
    body.append('interior_dashboard', interior_dashboard);
    body.append('meter_console', meter_console);
    body.append('video', video);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateCarImageAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            updateCarImageAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
