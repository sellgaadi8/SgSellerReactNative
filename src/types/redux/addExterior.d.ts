type ADD_EXTERIOR = 'sgSeller/addExterior';

type AddExteriorState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type AddExteriorAction = {
  type: ADD_EXTERIOR;
  payload: AddExteriorState;
};
