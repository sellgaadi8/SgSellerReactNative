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
  left_pillarA_image: string;
  left_pillarB_image: string;
  left_pillarC_image: string;
  right_pillarA_image: string;
  right_pillarB_image: string;
  right_pillarC_image: string;
  left_apron_image: string;
  left_apron_leg_image: string;
  right_apron_leg_image: string;
  right_apron_image: string;
  boot_floor_image: string;
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
