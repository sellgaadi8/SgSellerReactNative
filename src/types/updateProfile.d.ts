type UPDATE_PROFILE_DETAILS = 'sgSeller/updateProfile';

type UpdateProfileState = {
  success: boolean;
  called: boolean;
  error: boolean;
  message: string | null;
};

type UpdateProfileAction = {
  type: UPDATE_PROFILE_DETAILS;
  payload: UpdateProfileState;
};
