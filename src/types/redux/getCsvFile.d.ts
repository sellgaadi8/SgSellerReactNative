type GET_CSV = 'sgSeller/getCsv';

type CsvState = {
  file: string;
  called: boolean;
  error: boolean;
};

type CsvAction = {
  type: GET_CSV;
  payload: CsvState;
};
