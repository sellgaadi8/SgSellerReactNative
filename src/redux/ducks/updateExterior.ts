import axiosInstance from '../../axios';
import {updateExteriorUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_EXTERIOR: UPDATE_EXTERIOR = 'sgSeller/updateExterior';

const initialState: UpdateExteriorState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: UpdateExteriorAction,
): UpdateExteriorState => {
  switch (action.type) {
    case UPDATE_EXTERIOR:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateExteriorAction = (
  res: UpdateExteriorState,
): UpdateExteriorAction => {
  return {type: UPDATE_EXTERIOR, payload: {...res, called: true}};
};

export const onUpdateExterior =
  (
    id: string,
    left_pillarA: string,
    left_pillarB: string,
    left_pillarC: string,
    right_pillarA: string,
    right_pillarB: string,
    right_pillarC: string,
    left_apron: string,
    left_apron_leg: string,
    right_apron_leg: string,
    right_apron: string,
    boot_floor: string,
    left_pillarA_image: string,
    left_pillarB_image: string,
    left_pillarC_image: string,
    right_pillarA_image: string,
    right_pillarB_image: string,
    right_pillarC_image: string,
    left_apron_image: string,
    left_apron_leg_image: string,
    right_apron_leg_image: string,
    right_apron_image: string,
    boot_floor_image: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = updateExteriorUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    body.append('left_pillarA', left_pillarA);
    body.append('left_pillarB', left_pillarB);
    body.append('left_pillarC', left_pillarC);
    body.append('right_pillarA', right_pillarA);
    body.append('right_pillarB', right_pillarB);
    body.append('right_pillarC', right_pillarC);
    body.append('left_apron', left_apron);
    body.append('left_apron_leg', left_apron_leg);
    body.append('right_apron_leg', right_apron_leg);
    body.append('right_apron', right_apron);
    body.append('boot_floor', boot_floor);
    body.append('left_pillarA_image', left_pillarA_image);
    body.append('left_pillarB_image', left_pillarB_image);
    body.append('left_pillarC_image', left_pillarC_image);
    body.append('right_pillarA_image', right_pillarA_image);
    body.append('right_pillarB_image', right_pillarB_image);
    body.append('right_pillarC_image', right_pillarC_image);
    body.append('left_apron_image', left_apron_image);
    body.append('left_apron_leg_image', left_apron_leg_image);
    body.append('right_apron_leg_image', right_apron_leg_image);
    body.append('right_apron_image', right_apron_image);
    body.append('boot_floor_image', boot_floor_image);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateExteriorAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            updateExteriorAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
