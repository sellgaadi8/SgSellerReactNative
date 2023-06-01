type GET_CAR_DOCUMENTS = 'sgSeller/getCarDocuemnts';

type CarDocument = {
  rto: string;
  chasis_no: string;
  insurance: string;
  fitness_upto: string;
  duplicate_key: string;
  rc_noc_issued: string;
  road_tax_paid: string;
  mismatch_in_rc: string;
  cng_lpg_fitment: string;
  rc_availability: string;
  partipeshi_request: string;
  under_hypothication: string;
  cng_lpg_fitment_endorsed_on_rc: string;
};

type GetCarDocumentsState = {
  called: boolean;
  success: boolean;
  error: boolean;
  data: CarDocument | null;
};

type GetCarDocumentsAction = {
  type: GET_CAR_DOCUMENTS;
  payload: GetCarDocumentsState;
};
