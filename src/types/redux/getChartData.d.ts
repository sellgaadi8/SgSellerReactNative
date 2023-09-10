type CHART = 'sgSeller/chart';

type ChartState = {
  success: boolean;
  data: {datasets: {data: number[]}[]; labels: string[]} | null;
  called: boolean;
  error: boolean;
  message: string;
};

type ChartAction = {
  type: CHART;
  payload: ChartState;
};
