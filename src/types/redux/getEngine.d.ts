type GET_ENGINE_DETAILS = 'sgSeller/getEngineDetails';

type ENGINE = {
  gear_oil_leakage: string;
  exhaust_smoke: string;
  engine_perm_blow_back: string;
  engine_mounting: string;
  engine_sound: string;
  clutch_bearing_sound: string;
  ac: string;
  cooling: string;
  heater: string;
  condensor: string;
  gear_oil_leakage_image: string;
  exhaust_smoke_image: string;
  engine_sound_video: string;
};

type GetEngineDetailsState = {
  called: boolean;
  error: boolean;
  success: boolean;
  data: ENGINE | null;
};

type GetEngineDetailsAction = {
  type: GET_ENGINE_DETAILS;
  payload: GetEngineDetailsState;
};
