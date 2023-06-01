type ADD_CAR_DOCUMENTS = 'sgSeller/addCarDocs';

type AddCarDocumentState = {
  called: boolean;
  success: boolean;
  error: boolean;
  message: string;
};

type AddCarDocumentAction = {
  type: ADD_CAR_DOCUMENTS;
  payload: AddCarDocumentState;
};
