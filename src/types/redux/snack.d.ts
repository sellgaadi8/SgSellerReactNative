type ON_SNACK = 'utils/snack';

type SnackAction = {
  type: ON_SNACK;
  payload: SnackState;
};

type SnackActionParameters = {
  title?: null | string;
  autoClose?: boolean;
};

type SnackState = {
  title?: null | string;
  mode: SnackMode;
  called: boolean;
};
