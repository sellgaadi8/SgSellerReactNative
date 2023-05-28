type DELETE_VALUATOR_DETAIL = 'sgSeller/deleteValuator';

type DeleteValuatorState = {
  success: boolean;
  called: boolean;
  error: boolean;
  message: string | null;
};

type DeleteValuatorAction = {
  type: DELETE_VALUATOR_DETAIL;
  payload: DeleteValuatorState;
};
