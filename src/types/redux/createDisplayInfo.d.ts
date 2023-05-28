type CREATE_DISPLAY_INFO = 'sgSeller/addDisplay';

type CreateDisplayInfoState = {
  called: boolean;
  message: string;
  success: boolean;
  error: boolean;
};

type CreateDisplayInfoAction = {
  type: CREATE_DISPLAY_INFO;
  payload: CreateDisplayInfoState;
};
