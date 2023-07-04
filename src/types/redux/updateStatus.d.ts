type UPDATE_STATUS = 'sgSeller/updateStatus';

type UpdateStatusState = {
  error: boolean;
  called: boolean;
  success: boolean;
  message: string;
};

type UpdateStatusAction = {
  type: UPDATE_STATUS;
  payload: UpdateStatusState;
};
