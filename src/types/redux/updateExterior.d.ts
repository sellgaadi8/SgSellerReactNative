type UPDATE_EXTERIOR = 'sgSeller/updateExterior';

type UpdateExteriorState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type UpdateExteriorAction = {
  type: UPDATE_EXTERIOR;
  payload: UpdateExteriorState;
};
