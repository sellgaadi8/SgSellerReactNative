import axiosInstance from '../../axios';
import {ADD_DISPLAY_INFO} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const CREATE_DISPLAY_INFO: CREATE_DISPLAY_INFO = 'sgSeller/addDisplay';

const initialState: CreateDisplayInfoState = {
  error: false,
  called: false,
  success: false,
  message: '',
  uuid: '',
};

export default (
  state = initialState,
  action: CreateDisplayInfoAction,
): CreateDisplayInfoState => {
  switch (action.type) {
    case CREATE_DISPLAY_INFO:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const createDisplayInfoAction = (
  res: CreateDisplayInfoState,
): CreateDisplayInfoAction => {
  return {type: CREATE_DISPLAY_INFO, payload: {...res, called: true}};
};

export const createDisplayForm =
  (
    make: string,
    model: string,
    variant: string,
    mfg_year: string,
    reg_date: string,
    transmission: string,
    color: string,
    fuel_type: string,
    no_of_kms: string,
    no_of_owners: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = ADD_DISPLAY_INFO;

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    body.append('make', make);
    body.append('model', model);
    body.append('variant', variant);
    body.append('mfg_year', mfg_year);
    body.append('reg_date', reg_date);
    body.append('transmission', transmission);
    body.append('color', color);
    body.append('fuel_type', fuel_type);
    body.append('no_of_kms', no_of_kms);
    body.append('no_of_owners', no_of_owners);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(createDisplayInfoAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._repsonse) {
          dispatch(
            createDisplayInfoAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
