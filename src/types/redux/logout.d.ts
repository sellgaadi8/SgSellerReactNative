type LOGOUT = 'sgSeller/logout';

type LogoutState = {
  success: boolean;
  called: boolean;
  message: string | null;
  error: boolean;
};

type LogoutAction = {
  type: LOGOUT;
  payload: LogoutState;
};
