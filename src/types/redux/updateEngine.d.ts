type UPDATE_ENGINE = 'sgSeller/updateEngine';

type UpdateEngineState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type UpdateEngineAction = {
  type: UPDATE_ENGINE;
  payload: UpdateEngineState;
};
