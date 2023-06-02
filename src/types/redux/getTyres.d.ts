type GET_TYRES = 'sgSeller/getTyres';

type Tyres = {
  lhs_front_type: string;
  rhs_front_type: string;
  lhs_back_type: string;
  rhs_back_type: string;
  spare_type: string;
};

type GetTyresState = {
  called: boolean;
  error: boolean;
  success: boolean;
  data: Tyres | null;
};

type GetTyresAction = {
  type: GET_TYRES;
  payload: GetTyresState;
};
