type UPDATE_SUSPENSION = 'sgSeller/updateSuspension';

type UpdateSuspensionState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type UpdateSuspensionAction = {
  type: UPDATE_SUSPENSION;
  payload: UpdateSuspensionState;
};
