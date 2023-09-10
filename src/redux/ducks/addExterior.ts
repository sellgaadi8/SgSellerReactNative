import axiosInstance from '../../axios';
import {addExteriorUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ADD_EXTERIOR: ADD_EXTERIOR = 'sgSeller/addExterior';

const initialState: AddExteriorState = {
  error: false,
  called: false,
  success: false,
  message: '',
  uuid: '',
};

export default (
  state = initialState,
  action: AddExteriorAction,
): AddExteriorState => {
  switch (action.type) {
    case ADD_EXTERIOR:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const addExteriorAction = (res: AddExteriorState): AddExteriorAction => {
  return {type: ADD_EXTERIOR, payload: {...res, called: true}};
};

export const onAddExterior =
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
    const url = addExteriorUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    if (left_pillarA && left_pillarA.length !== 0) {
      body.append('left_pillarA', left_pillarA);
    }

    if (left_pillarB && left_pillarB.length !== 0) {
      body.append('left_pillarB', left_pillarB);
    }

    if (left_pillarC && left_pillarC.length !== 0) {
      body.append('left_pillarC', left_pillarC);
    }

    if (right_pillarA && right_pillarA.length !== 0) {
      body.append('right_pillarA', right_pillarA);
    }

    if (right_pillarB && right_pillarB.length !== 0) {
      body.append('right_pillarB', right_pillarB);
    }

    if (right_pillarC && right_pillarC.length !== 0) {
      body.append('right_pillarC', right_pillarC);
    }

    if (left_apron && left_apron.length !== 0) {
      body.append('left_apron', left_apron);
    }

    if (left_apron_leg && left_apron_leg.length !== 0) {
      body.append('left_apron_leg', left_apron_leg);
    }

    if (right_apron_leg && right_apron_leg.length !== 0) {
      body.append('right_apron_leg', right_apron_leg);
    }

    if (right_apron && right_apron.length !== 0) {
      body.append('right_apron', right_apron);
    }

    if (boot_floor && boot_floor.length !== 0) {
      body.append('boot_floor', boot_floor);
    }

    if (left_pillarA_image && left_pillarA_image.length !== 0) {
      body.append('left_pillarA_image', left_pillarA_image);
    }

    if (left_pillarB_image && left_pillarB_image.length !== 0) {
      body.append('left_pillarB_image', left_pillarB_image);
    }

    if (left_pillarC_image && left_pillarC_image.length !== 0) {
      body.append('left_pillarC_image', left_pillarC_image);
    }

    if (right_pillarA_image && right_pillarA_image.length !== 0) {
      body.append('right_pillarA_image', right_pillarA_image);
    }

    if (right_pillarB_image && right_pillarB_image.length !== 0) {
      body.append('right_pillarB_image', right_pillarB_image);
    }

    if (right_pillarC_image && right_pillarC_image.length !== 0) {
      body.append('right_pillarC_image', right_pillarC_image);
    }

    if (left_apron_image && left_apron_image.length !== 0) {
      body.append('left_apron_image', left_apron_image);
    }

    if (left_apron_leg_image && left_apron_leg_image.length !== 0) {
      body.append('left_apron_leg_image', left_apron_leg_image);
    }

    if (right_apron_leg_image && right_apron_leg_image.length !== 0) {
      body.append('right_apron_leg_image', right_apron_leg_image);
    }

    if (right_apron_image && right_apron_image.length !== 0) {
      body.append('right_apron_image', right_apron_image);
    }

    if (boot_floor_image && boot_floor_image.length !== 0) {
      body.append('boot_floor_image', boot_floor_image);
    }

    if (headlight_visor && headlight_visor.length !== 0) {
      body.append('headlight_visor', headlight_visor);
    }

    if (front_panel && front_panel.length !== 0) {
      body.append('front_panel', front_panel);
    }

    if (mudguard_front && mudguard_front.length !== 0) {
      body.append('mudguard_front', mudguard_front);
    }

    if (fuel_tank && fuel_tank.length !== 0) {
      body.append('fuel_tank', fuel_tank);
    }

    if (front_panel_left && front_panel_left.length !== 0) {
      body.append('front_panel_left', front_panel_left);
    }

    if (middle_panel && middle_panel.length !== 0) {
      body.append('middle_panel', middle_panel);
    }

    if (chassis && chassis.length !== 0) {
      body.append('chassis', chassis);
    }

    if (engine_guard_left && engine_guard_left.length !== 0) {
      body.append('engine_guard_left', engine_guard_left);
    }

    if (pillion_footrest && pillion_footrest.length !== 0) {
      body.append('pillion_footrest', pillion_footrest);
    }

    if (rear_panel_left && rear_panel_left.length !== 0) {
      body.append('rear_panel_left', rear_panel_left);
    }

    if (mudguard_rear && mudguard_rear.length !== 0) {
      body.append('mudguard_rear', mudguard_rear);
    }

    if (silencer_assembly && silencer_assembly.length !== 0) {
      body.append('silencer_assembly', silencer_assembly);
    }

    if (rear_panel_right && rear_panel_right.length !== 0) {
      body.append('rear_panel_right', rear_panel_right);
    }

    if (middle_panel_right && middle_panel_right.length !== 0) {
      body.append('middle_panel_right', middle_panel_right);
    }

    if (engine_guard_right && engine_guard_right.length !== 0) {
      body.append('engine_guard_right', engine_guard_right);
    }

    if (front_panel_right && front_panel_right.length !== 0) {
      body.append('front_panel_right', front_panel_right);
    }

    if (headlight_visor_image && headlight_visor_image.length !== 0) {
      body.append('headlight_visor_image', headlight_visor_image);
    }

    if (front_panel_image && front_panel_image.length !== 0) {
      body.append('front_panel_image', front_panel_image);
    }

    if (mudguard_front_image && mudguard_front_image.length !== 0) {
      body.append('mudguard_front_image', mudguard_front_image);
    }

    if (fuel_tank_image && fuel_tank_image.length !== 0) {
      body.append('fuel_tank_image', fuel_tank_image);
    }

    if (front_panel_left_image && front_panel_left_image.length !== 0) {
      body.append('front_panel_left_image', front_panel_left_image);
    }

    if (middle_panel_image && middle_panel_image.length !== 0) {
      body.append('middle_panel_image', middle_panel_image);
    }

    if (chassis_image && chassis_image.length !== 0) {
      body.append('chassis_image', chassis_image);
    }

    if (engine_guard_left_image && engine_guard_left_image.length !== 0) {
      body.append('engine_guard_left_image', engine_guard_left_image);
    }

    if (pillion_footrest_image && pillion_footrest_image.length !== 0) {
      body.append('pillion_footrest_image', pillion_footrest_image);
    }

    if (rear_panel_left_image && rear_panel_left_image.length !== 0) {
      body.append('rear_panel_left_image', rear_panel_left_image);
    }

    if (mudguard_rear_image && mudguard_rear_image.length !== 0) {
      body.append('mudguard_rear_image', mudguard_rear_image);
    }

    if (silencer_assembly_image && silencer_assembly_image.length !== 0) {
      body.append('silencer_assembly_image', silencer_assembly_image);
    }

    if (rear_panel_right_image && rear_panel_right_image.length !== 0) {
      body.append('rear_panel_right_image', rear_panel_right_image);
    }

    if (middle_panel_right_image && middle_panel_right_image.length !== 0) {
      body.append('middle_panel_right_image', middle_panel_right_image);
    }

    if (engine_guard_right_image && engine_guard_right_image.length !== 0) {
      body.append('engine_guard_right_image', engine_guard_right_image);
    }

    if (front_panel_right_image && front_panel_right_image.length !== 0) {
      body.append('front_panel_right_image', front_panel_right_image);
    }

    if (overall_rating) {
      body.append('overall_rating', overall_rating);
    }

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(addExteriorAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            addExteriorAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
