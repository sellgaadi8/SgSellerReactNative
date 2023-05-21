type UPDATE_VALUATOR_DETAIL = 'sgSeller/updateValuator';

type UpdateValuatorState = {
  success: boolean;
  called: boolean;
  error: boolean;
  message: string | null;
};

type UpdateValuatorAction = {
  type: UPDATE_VALUATOR_DETAIL;
  payload: UpdateValuatorState;
};
