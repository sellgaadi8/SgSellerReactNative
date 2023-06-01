type GET_TYRES = 'sgSeller/getTyres';

type Tyres = {
  boot_floor: string;
  left_apron: string;
  right_apron: string;
  left_pillarA: string;
  left_pillarB: string;
  left_pillarC: string;
  right_pillarA: string;
  right_pillarB: string;
  right_pillarC: string;
  left_apron_leg: string;
  right_apron_leg: string;
};

type GetTyresState = {
  called: boolean;
  error: boolean;
  success: boolean;
  data: Exterior | null;
};

type GetTyresAction = {
  type: GET_TYRES;
  payload: GetTyresState;
};
