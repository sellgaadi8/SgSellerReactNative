type UPDATE_ELECTRICAL = 'sgSeller/updateElectrical';

type UpdateElectricalState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type UpdateElectricalAction = {
  type: UPDATE_ELECTRICAL;
  payload: UpdateElectricalState;
};
