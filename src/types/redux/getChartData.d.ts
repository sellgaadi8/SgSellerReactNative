type CHART = 'sgSeller/chart';

type ChartState = {
  success: boolean;
  data: {datasets: {data: number[]}[]; labels: string[]} | null;
  called: boolean;
  error: boolean;
};

type ChartAction = {
  type: CHART;
  payload: ChartState;
};
