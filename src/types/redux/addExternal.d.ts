type ADD_EXTERNAL = 'sgSeller/addExternal';

type AddExternalState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type AddExternalAction = {
  type: ADD_EXTERNAL;
  payload: AddExternalState;
};
