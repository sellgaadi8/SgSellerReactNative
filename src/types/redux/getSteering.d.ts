type GET_STEERING = 'sgSeller/getSteering';

type Steering = {
  suspension: string;
  steering: string;
  brake: string;
  wheel_bearing_noise: string;
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
