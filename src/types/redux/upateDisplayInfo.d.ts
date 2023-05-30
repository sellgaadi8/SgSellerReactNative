type UPDATE_DISPLAY_INFO = 'sgSeller/updateDisplay';

type UpdateDisplayInfoState = {
  called: boolean;
  message: string;
  success: boolean;
  error: boolean;
  uuid: string;
};

type UpdateDisplayInfoAction = {
  type: UPDATE_DISPLAY_INFO;
  payload: UpdateDisplayInfoState;
};
