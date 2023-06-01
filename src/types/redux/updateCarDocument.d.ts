type UPDATE_CAR_DOCUMENTS = 'sgSeller/updateCarDocs';

type UpdateCarDocumentState = {
  called: boolean;
  success: boolean;
  error: boolean;
  message: string;
};

type UpdateCarDocumentAction = {
  type: UPDATE_CAR_DOCUMENTS;
  payload: UpdateCarDocumentState;
};
