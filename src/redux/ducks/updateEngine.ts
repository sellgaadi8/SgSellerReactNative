import axiosInstance from '../../axios';
import {updateEngineUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_ENGINE: UPDATE_ENGINE = 'sgSeller/updateEngine';

const initialState: UpdateEngineState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: UpdateEngineAction,
): UpdateEngineState => {
  switch (action.type) {
    case UPDATE_ENGINE:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateEngineAction = (res: UpdateEngineState): UpdateEngineAction => {
  return {type: UPDATE_ENGINE, payload: {...res, called: true}};
};

export const onUpdateEngine =
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
    const url = updateEngineUrl(id);

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
        dispatch(updateEngineAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            updateEngineAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
