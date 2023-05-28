type GET_ALL_VALUATORS = 'sgSeller/getAllValuators';

type Valuators = {
  show: boolean;
  valuator_uuid: string;
  valuator_name: string;
  valuator_email: string;
  valuator_phone_no: string;
  valuator_aadhar_no: string;
  valuator_address: string;
  valuator_dealership_id: string;
};

type GetAllValuatorState = {
  success: boolean;
  called: boolean;
  error: boolean;
  data: Valuators[] | null;
};

type GetAllValuatorAction = {
  type: GET_ALL_VALUATORS;
  payload: GetAllValuatorState;
};
