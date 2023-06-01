type UPDATE_STEERING = 'sgSeller/updateSteering';

type UpdateSteeringState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type UpdateSteeringAction = {
  type: UPDATE_STEERING;
  payload: UpdateSteeringState;
};
