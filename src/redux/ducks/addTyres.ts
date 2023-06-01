import axiosInstance from '../../axios';
import {addTyresUrl} from '../../utils/api';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ADD_TYRES: ADD_TYRES = 'sgSeller/addTyres';

const initialState: AddTyresState = {
  error: false,
  called: false,
  success: false,
  message: '',
};

export default (
  state = initialState,
  action: AddTyresAction,
): AddTyresState => {
  switch (action.type) {
    case ADD_TYRES:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const addTyresAction = (res: AddTyresState): AddTyresAction => {
  return {type: ADD_TYRES, payload: {...res, called: true}};
};

export const onAddTyres =
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
    const url = addTyresUrl(id);

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
        dispatch(addTyresAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            addTyresAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
