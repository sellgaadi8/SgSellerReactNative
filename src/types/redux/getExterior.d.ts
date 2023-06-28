type GET_EXTERIOR = 'sgSeller/getExterior';

type Exterior = {
  boot_floor: string;
  left_apron: string;
  right_apron: string;
  left_pillarA: string;
  left_pillarB: string;
  left_pillarC: string;
  right_pillarA: string;
  right_pillarB: string;
  right_pillarC: string;
  left_apron_leg: string;
  right_apron_leg: string;
  left_pillarA_image: {
    url: string;
    file: string;
  } | null;
  left_pillarB_image: {
    url: string;
    file: stri | nullg;
  } | null;
  left_pillarC_image: {
    url: string;
    file: stri | nullg;
  } | null;
  right_pillarA_image: {
    url: string;
    file: stri | nullg;
  } | null;
  right_pillarB_image: {
    url: string;
    file: stri | nullg;
  } | null;
  right_pillarC_image: {
    url: string;
    file: stri | nullg;
  } | null;
  left_apron_image: {
    url: string;
    file: stri | nullg;
  } | null;
  left_apron_leg_image: {
    url: string;
    file: stri | nullg;
  } | null;
  right_apron_leg_image: {
    url: string;
    file: stri | nullg;
  } | null;
  right_apron_image: {
    url: string;
    file: stri | nullg;
  } | null;
  boot_floor_image: {
    url: string;
    file: stri | nullg;
  } | null;
  headlight_visor: string;
  front_panel: string;
  mudguard_front: string;
  fuel_tank: string;
  front_panel_left: string;
  middle_panel: string;
  chassis: string;
  engine_guard_left: string;
  pillion_footrest: string;
  rear_panel_left: string;
  mudguard_rear: string;
  silencer_assembly: string;
  rear_panel_right: string;
  middle_panel_right: string;
  engine_guard_right: string;
  front_panel_right: string;
  headlight_visor_image: {
    url: string;
    file: string;
  } | null;
  front_panel_image: {
    url: string;
    file: string;
  } | null;
  mudguard_front_image: {
    url: string;
    file: string;
  } | null;
  fuel_tank_image: {
    url: string;
    file: string;
  } | null;
  front_panel_left_image: {
    url: string;
    file: string;
  } | null;
  middle_panel_image: {
    url: string;
    file: string;
  } | null;
  chassis_image: {
    url: string;
    file: string;
  } | null;
  engine_guard_left_image: {
    url: string;
    file: string;
  } | null;
  pillion_footrest_image: {
    url: string;
    file: string;
  } | null;
  rear_panel_left_image: {
    url: string;
    file: string;
  } | null;
  mudguard_rear_image: {
    url: string;
    file: string;
  } | null;
  silencer_assembly_image: {
    url: string;
    file: string;
  } | null;
  rear_panel_right_image: {
    url: string;
    file: string;
  } | null;
  middle_panel_right_image: {
    url: string;
    file: string;
  } | null;
  engine_guard_right_image: {
    url: string;
    file: string;
  } | null;
  front_panel_right_image: {
    url: string;
    file: string;
  } | null;
  overall_rating: number | null;
};

type GetExteriorState = {
  called: boolean;
  error: boolean;
  success: boolean;
  data: Exterior | null;
};

type GetExteriorAction = {
  type: GET_EXTERIOR;
  payload: GetExteriorState;
};
