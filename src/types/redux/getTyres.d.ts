type GET_TYRES = 'sgSeller/getTyres';

type Tyres = {
  lhs_front_type: string;
  rhs_front_type: string;
  lhs_back_type: string;
  rhs_back_type: string;
  spare_type: string;
  lhs_front_image: {
    url: string;
    file: string;
  };
  rhs_front_image: {
    url: string;
    file: string;
  };
  lhs_back_image: {
    url: string;
    file: string;
  };
  rhs_back_image: {
    url: string;
    file: string;
  };
  spare_image: {
    url: string;
    file: string;
  };
  front_wheel_condition: string;
  rear_wheel_condition: string;
  front_tyre_life: string;
  front_wheel_condition_image: {
    url: string;
    file: string;
  };
  rear_wheel_condition_image: {
    url: string;
    file: string;
  };
  front_tyre_life_image: {
    url: string;
    file: string;
  };
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
