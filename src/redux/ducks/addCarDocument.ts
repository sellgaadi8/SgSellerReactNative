import axiosInstance from '../../axios';
import {addCarDocumentsUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ADD_CAR_DOCUMENTS: ADD_CAR_DOCUMENTS = 'sgSeller/addCarDocs';

const initialState: AddCarDocumentState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: AddCarDocumentAction,
): AddCarDocumentState => {
  switch (action.type) {
    case ADD_CAR_DOCUMENTS:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const addCarDocumentAction = (
  res: AddCarDocumentState,
): AddCarDocumentAction => {
  return {type: ADD_CAR_DOCUMENTS, payload: {...res, called: true}};
};

export const onAddCarDocuments =
  (
    id: string,
    rc_availability: string,
    rc_availability_image: string,
    rc_noc_issued: string,
    mismatch_in_rc: string,
    insurance: string,
    under_hypothication: string,
    rto: string,
    fitness_upto: string,
    permit_upto: string,
    cng_lpg_fitment: string,
    cng_lpg_fitment_endorsed_on_rc: string,
    road_tax_paid: string,
    partipeshi_request: string,
    duplicate_key: string,
    chasis_no: string,
    road_tax_paid_image: string,
    partipeshi_request_image: string,
    duplicate_key_image: string,
    chasis_no_image: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = addCarDocumentsUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    if (rc_availability && rc_availability.length !== 0) {
      body.append('rc_availability', rc_availability);
    }

    if (rc_availability_image && rc_availability_image.length !== 0) {
      body.append('rc_availability_image', rc_availability_image);
    }

    if (rc_noc_issued && rc_noc_issued.length !== 0) {
      body.append('rc_noc_issued', rc_noc_issued);
    }

    if (mismatch_in_rc.length !== 0) {
      body.append('mismatch_in_rc', mismatch_in_rc);
    }
    if (insurance && insurance.length !== 0) {
      body.append('insurance', insurance);
    }

    if (under_hypothication && under_hypothication.length !== 0) {
      body.append('under_hypothication', under_hypothication);
    }

    if (rto && rto.length !== 0) {
      body.append('rto', rto);
    }

    if (fitness_upto.length !== 0) {
      body.append('fitness_upto', fitness_upto);
    }
    if (permit_upto.length !== 0) {
      body.append('permit_upto', permit_upto);
    }
    if (cng_lpg_fitment.length !== 0) {
      body.append('cng_lpg_fitment', cng_lpg_fitment);
    }
    if (cng_lpg_fitment_endorsed_on_rc.length !== 0) {
      body.append(
        'cng_lpg_fitment_endorsed_on_rc',
        cng_lpg_fitment_endorsed_on_rc,
      );
    }

    if (road_tax_paid.length !== 0) {
      body.append('road_tax_paid', road_tax_paid);
    }
    if (partipeshi_request && partipeshi_request.length !== 0) {
      body.append('partipeshi_request', partipeshi_request);
    }

    if (duplicate_key && duplicate_key.length !== 0) {
      body.append('duplicate_key', duplicate_key);
    }

    if (chasis_no && chasis_no.length !== 0) {
      body.append('chasis_no', chasis_no);
    }

    if (road_tax_paid_image && road_tax_paid_image.length !== 0) {
      body.append('road_tax_paid_image', road_tax_paid_image);
    }

    if (partipeshi_request_image && partipeshi_request_image.length !== 0) {
      body.append('partipeshi_request_image', partipeshi_request_image);
    }

    if (duplicate_key_image && duplicate_key_image.length !== 0) {
      body.append('duplicate_key_image', duplicate_key_image);
    }

    if (chasis_no_image && chasis_no_image.length !== 0) {
      body.append('chasis_no_image', chasis_no_image);
    }

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(addCarDocumentAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            addCarDocumentAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
