import axiosInstance from '../../axios';
import {getChartList} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const CHART: CHART = 'sgSeller/chart';

const initialState: ChartState = {
  called: false,
  success: false,
  error: false,
  data: null,
  message: '',
};

export default (state = initialState, action: ChartAction): ChartState => {
  switch (action.type) {
    case CHART:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const chartAction = (res: ChartState): ChartAction => {
  return {type: CHART, payload: {...res, called: true}};
};

export const getCharts =
  (from: string, to: string) => async (dispatch: AppDispatch) => {
    const url = getChartList(from, to);

    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axiosInstance
      .get(url, config)
      .then(res => {
        dispatch(chartAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            chartAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
