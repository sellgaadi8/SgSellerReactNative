type GET_EXTERNAL = 'sgSeller/getExternal';

type External = {
  bonnet_head: string;
  roof: string;
  dickey_door: string;
  left_door_front: string;
  left_door_back: string;
  right_door_front: string;
  right_door_back: string;
  left_fender: string;
  right_fender: string;
  left_quater_panel: string;
  right_quater_panel: string;
};

type GetExternalState = {
  called: boolean;
  error: boolean;
  success: boolean;
  data: External | null;
};

type GetExternalAction = {
  type: GET_EXTERNAL;
  payload: GetExternalState;
};
