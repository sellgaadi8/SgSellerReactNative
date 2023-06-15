type GET_TYRES = 'sgSeller/getTyres';

type Tyres = {
  lhs_front_type: string;
  rhs_front_type: string;
  lhs_back_type: string;
  rhs_back_type: string;
  spare_type: string;
  lhs_front_image: string;
  rhs_front_image: string;
  lhs_back_image: string;
  rhs_back_image: string;
  spare_image: string;
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
