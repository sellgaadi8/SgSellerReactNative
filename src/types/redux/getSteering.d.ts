type GET_STEERING = 'sgSeller/getSteering';

type Steering = {
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
};

type GetSteeringState = {
  called: boolean;
  error: boolean;
  success: boolean;
  data: Steering | null;
};

type GetSteeringAction = {
  type: GET_STEERING;
  payload: GetSteeringState;
};