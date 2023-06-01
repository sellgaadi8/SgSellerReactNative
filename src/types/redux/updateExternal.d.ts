type UPDATE_EXTERNAL = 'sgSeller/updateExternal';

type UpdateExternalState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type UpdateExternalAction = {
  type: UPDATE_EXTERNAL;
  payload: UpdateExternalState;
};
