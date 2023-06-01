type ADD_ELECTRICAL = 'sgSeller/addElectrical';

type AddElectricalState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type AddElectricalAction = {
  type: ADD_ELECTRICAL;
  payload: AddElectricalState;
};
