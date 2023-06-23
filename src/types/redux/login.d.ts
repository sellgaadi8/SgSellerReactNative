type VehicleType = '2_wheeler' | 'commercial' | '4_wheeler';

type LOGIN = 'sgSeller/login';

type LoginState = {
  success: boolean;
  called: boolean;
  message: string | null;
  error: boolean;
  name: string | null;
  token: string | null;
  seller_type: VehicleType;
};

type LoginAction = {
  type: LOGIN;
  payload: LoginState;
};
