type UPDATE_TYRES = 'sgSeller/updateTyres';

type UpdateTyresState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type UpdateTyresAction = {
  type: UPDATE_TYRES;
  payload: UpdateTyresState;
};
