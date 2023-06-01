type ADD_STEERING = 'sgSeller/addSteering';

type AddSteeringState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type AddSteeringAction = {
  type: ADD_STEERING;
  payload: AddSteeringState;
};
