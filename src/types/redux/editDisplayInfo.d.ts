type EDIT_DISPLAY_INFO = 'sgSeller/editDisplay';

type Display = {
  make: string;
  model: string;
  variant: string;
  mfg_year: string;
  reg_date: string;
  transmission: string;
  color: string;
  fuel_type: string;
  no_of_kms: string;
  no_of_owners: string;
};

type EditDisplayInfoState = {
  called: boolean;
  data: Display | null;
  success: boolean;
  error: boolean;
};

type EditDisplayInfoAction = {
  type: EDIT_DISPLAY_INFO;
  payload: EditDisplayInfoState;
};
