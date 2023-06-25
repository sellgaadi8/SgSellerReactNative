type ADD_SUSPENSION = 'sgSeller/addSuspension';

type AddSuspensionState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type AddSuspensionAction = {
  type: ADD_SUSPENSION;
  payload: AddSuspensionState;
};
