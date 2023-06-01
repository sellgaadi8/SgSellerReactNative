import axiosInstance from '../../axios';
import {addElectricalsUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ADD_ELECTRICAL: ADD_ELECTRICAL = 'sgSeller/addElectrical';

const initialState: AddElectricalState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: AddElectricalAction,
): AddElectricalState => {
  switch (action.type) {
    case ADD_ELECTRICAL:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const addElectricalAction = (res: AddElectricalState): AddElectricalAction => {
  return {type: ADD_ELECTRICAL, payload: {...res, called: true}};
};

export const onAddElectrical =
  (
    id: string,
    left_pillarA: string,
    left_pillarB: string,
    left_pillarC: string,
    right_pillarB: string,
    left_apron: string,
    left_apron_leg: string,
    right_apron_leg: string,
    right_pillarA: string,
    right_pillarC: string,
    right_apron: string,
    boot_floor: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = addElectricalsUrl(id);

    const token = await getUserToken();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = new FormData();

    body.append('left_pillarA', left_pillarA);
    body.append('left_pillarB', left_pillarB);
    body.append('left_pillarC', left_pillarC);
    body.append('right_pillarB', right_pillarB);
    body.append('left_apron', left_apron);
    body.append('left_apron_leg', left_apron_leg);
    body.append('right_apron_leg', right_apron_leg);
    body.append('right_pillarA', right_pillarA);
    body.append('right_pillarC', right_pillarC);
    body.append('right_apron', right_apron);
    body.append('boot_floor', boot_floor);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(addElectricalAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            addElectricalAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
