type GET_SUSPENSION = 'sgSeller/getSuspension';

type SuspensionHandling = {
  handle: string;
  front_shock_absorber: string;
  rear_shock_absorber: string;
  front_brake_condition: string;
  rear_brake_condition: string;
  handle_image: {
    url: string;
    file: string;
  };
  front_shock_absorber_image: {
    url: string;
    file: string;
  };
  rear_shock_absorber_image: {
    url: string;
    file: string;
  };
  front_brake_condition_image: {
    url: string;
    file: string;
  };
  rear_brake_condition_image: {
    url: string;
    file: string;
  };
  overall_rating: number | null;
};

type GetSuspensionState = {
  called: boolean;
  error: boolean;
  success: boolean;
  data: SuspensionHandling | null;
};

type GetSuspensionAction = {
  type: GET_SUSPENSION;
  payload: GetSuspensionState;
};
