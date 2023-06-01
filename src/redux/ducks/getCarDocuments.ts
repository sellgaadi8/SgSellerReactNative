import axiosInstance from '../../axios';
import {getCarDocumentsUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_CAR_DOCUMENTS: GET_CAR_DOCUMENTS = 'sgSeller/getCarDocuemnts';

const initialState: GetCarDocumentsState = {
  called: false,
  success: false,
  error: false,
  data: null,
};

export default (
  state = initialState,
  action: GetCarDocumentsAction,
): GetCarDocumentsState => {
  switch (action.type) {
    case GET_CAR_DOCUMENTS:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const getCarDocumentsAction = (
  res: GetCarDocumentsState,
): GetCarDocumentsAction => {
  return {type: GET_CAR_DOCUMENTS, payload: {...res, called: true}};
};

export const onGetCarDocuments =
  (id: string) => async (dispatch: AppDispatch) => {
    const url = getCarDocumentsUrl(id);
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axiosInstance
      .get(url, config)
      .then(res => {
        dispatch(getCarDocumentsAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            getCarDocumentsAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
