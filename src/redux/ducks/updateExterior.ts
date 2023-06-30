import axiosInstance from '../../axios';
import {updateExteriorUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
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
    headlight_visor: string,
    front_panel: string,
    mudguard_front: string,
    fuel_tank: string,
    front_panel_left: string,
    middle_panel: string,
    chassis: string,
    engine_guard_left: string,
    pillion_footrest: string,
    rear_panel_left: string,
    mudguard_rear: string,
    silencer_assembly: string,
    rear_panel_right: string,
    middle_panel_right: string,
    engine_guard_right: string,
    front_panel_right: string,
    headlight_visor_image: string,
    front_panel_image: string,
    mudguard_front_image: string,
    fuel_tank_image: string,
    front_panel_left_image: string,
    middle_panel_image: string,
    chassis_image: string,
    engine_guard_left_image: string,
    pillion_footrest_image: string,
    rear_panel_left_image: string,
    mudguard_rear_image: string,
    silencer_assembly_image: string,
    rear_panel_right_image: string,
    middle_panel_right_image: string,
    engine_guard_right_image: string,
    front_panel_right_image: string,
    overall_rating: number,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = updateExteriorUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
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
    body.append('headlight_visor', headlight_visor);
    body.append('front_panel', front_panel);
    body.append('mudguard_front', mudguard_front);
    body.append('fuel_tank', fuel_tank);
    body.append('front_panel_left', front_panel_left);
    body.append('middle_panel', middle_panel);
    body.append('chassis', chassis);
    body.append('engine_guard_left', engine_guard_left);
    body.append('pillion_footrest', pillion_footrest);
    body.append('rear_panel_left', rear_panel_left);
    body.append('mudguard_rear', mudguard_rear);
    body.append('silencer_assembly', silencer_assembly);
    body.append('rear_panel_right', rear_panel_right);
    body.append('middle_panel_right', middle_panel_right);
    body.append('engine_guard_right', engine_guard_right);
    body.append('front_panel_right', front_panel_right);
    body.append('headlight_visor_image', headlight_visor_image);
    body.append('front_panel_image', front_panel_image);
    body.append('mudguard_front_image', mudguard_front_image);
    body.append('fuel_tank_image', fuel_tank_image);
    body.append('front_panel_left_image', front_panel_left_image);
    body.append('middle_panel_image', middle_panel_image);
    body.append('chassis_image', chassis_image);
    body.append('engine_guard_left_image', engine_guard_left_image);
    body.append('pillion_footrest_image', pillion_footrest_image);
    body.append('rear_panel_left_image', rear_panel_left_image);
    body.append('mudguard_rear_image', mudguard_rear_image);
    body.append('silencer_assembly_image', silencer_assembly_image);
    body.append('rear_panel_right_image', rear_panel_right_image);
    body.append('middle_panel_right_image', middle_panel_right_image);
    body.append('engine_guard_right_image', engine_guard_right_image);
    body.append('front_panel_right_image', front_panel_right_image);
    body.append('overall_rating', overall_rating);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateExteriorAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
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
