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
    registration_no: string,
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

    body.append('rc_availability', rc_availability);

    body.append('rc_availability_image', rc_availability_image);

    body.append('rc_noc_issued', rc_noc_issued);

    body.append('mismatch_in_rc', mismatch_in_rc);
    body.append('insurance', insurance);

    body.append('under_hypothication', under_hypothication);

    body.append('rto', rto);

    body.append('fitness_upto', fitness_upto);
    body.append('permit_upto', permit_upto);
    body.append('cng_lpg_fitment', cng_lpg_fitment);
    body.append(
      'cng_lpg_fitment_endorsed_on_rc',
      cng_lpg_fitment_endorsed_on_rc,
    );

    body.append('road_tax_paid', road_tax_paid);
    body.append('partipeshi_request', partipeshi_request);

    body.append('duplicate_key', duplicate_key);

    body.append('chasis_no', chasis_no);

    body.append('road_tax_paid_image', road_tax_paid_image);

    body.append('partipeshi_request_image', partipeshi_request_image);

    body.append('duplicate_key_image', duplicate_key_image);

    body.append('chasis_no_image', chasis_no_image);

    body.append('registration_no', registration_no);

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
