type GET_CSV = 'sgSeller/getCsv';

type CsvState = {
  success: boolean;
  file: string;
  called: boolean;
  error: boolean;
};

type CsvAction = {
  type: GET_CSV;
  payload: CsvState;
};
