type ADD_TYRES = 'sgSeller/addTyres';

type AddTyresState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type AddTyresAction = {
  type: ADD_TYRES;
  payload: AddTyresState;
};
