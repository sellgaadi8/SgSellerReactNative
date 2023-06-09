import axiosInstance from '../../axios';
import {updateCarDocumentsUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_CAR_DOCUMENTS: UPDATE_CAR_DOCUMENTS = 'sgSeller/updateCarDocs';

const initialState: UpdateCarDocumentState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: UpdateCarDocumentAction,
): UpdateCarDocumentState => {
  switch (action.type) {
    case UPDATE_CAR_DOCUMENTS:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateCarDocumentAction = (
  res: UpdateCarDocumentState,
): UpdateCarDocumentAction => {
  return {type: UPDATE_CAR_DOCUMENTS, payload: {...res, called: true}};
};

export const onUpdateCarDocuments =
  (
    id: string,
    rc_availability: string,
    rc_noc_issued: string,
    mismatch_in_rc: string,
    insurance: string,
    under_hypothication: string,
    rto: string,
    fitness_upto: string,
    cng_lpg_fitment: string,
    cng_lpg_fitment_endorsed_on_rc: string,
    road_tax_paid: string,
    partipeshi_request: string,
    duplicate_key: string,
    chasis_no: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = updateCarDocumentsUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    body.append('rc_availability', rc_availability);
    body.append('rc_noc_issued', rc_noc_issued);
    body.append('mismatch_in_rc', mismatch_in_rc);
    body.append('insurance', insurance);
    body.append('under_hypothication', under_hypothication);
    body.append('rto', rto);
    body.append('fitness_upto', fitness_upto);
    body.append('cng_lpg_fitment', cng_lpg_fitment);
    body.append(
      'cng_lpg_fitment_endorsed_on_rc',
      cng_lpg_fitment_endorsed_on_rc,
    );
    body.append('road_tax_paid', road_tax_paid);
    body.append('partipeshi_request', partipeshi_request);
    body.append('duplicate_key', duplicate_key);
    body.append('chasis_no', chasis_no);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateCarDocumentAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            updateCarDocumentAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
