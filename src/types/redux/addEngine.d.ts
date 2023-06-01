type ADD_ENGINE = 'sgSeller/addEngine';

type AddEngineState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type AddEngineAction = {
  type: ADD_ENGINE;
  payload: AddEngineState;
};
