import axiosInstance from '../../axios';
import {getCsvFiles} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_CSV: GET_CSV = 'sgSeller/getCsv';

const initialState: CsvState = {
  called: false,
  success: false,
  error: false,
  file: '',
};

export default (state = initialState, action: CsvAction): CsvState => {
  switch (action.type) {
    case GET_CSV:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const csvAction = (res: CsvState): CsvAction => {
  return {type: GET_CSV, payload: {...res, called: true}};
};

export const getCsvFileDownload =
  (from: string, to: string, type: string) => async (dispatch: AppDispatch) => {
    const url = getCsvFiles(from, to, type);

    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axiosInstance
      .get(url, config)
      .then(res => {
        dispatch(csvAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            csvAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
