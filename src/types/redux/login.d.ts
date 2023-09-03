type VehicleType = 'two_wheeler' | 'three_wheeler' | 'four_wheeler';

type LOGIN = 'sgSeller/login';

type LoginState = {
  success: boolean;
  called: boolean;
  message: string;
  error: boolean;
  name: string | null;
  token: string | null;
  seller_type: VehicleType | null;
};

type LoginAction = {
  type: LOGIN;
  payload: LoginState;
};
