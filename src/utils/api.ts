const LOGIN_SEND_OTP = '/getOtp';
const LOGIN_SUBMIT = '/login';
const REGISTER_USER = '/register';
const GET_PROFILE = '/getProfileDetails';
const UPDATE_PROFILE = '/updateProfileDetails';
const RESET_PASSWORD = '/changePassword';
const LOGOUT_URL = '/logout';
const GET_ALL_VALUATORS_LIST = '/valuator/getAllValuatorDetails';
const UPDATE_VALUATOR = '/valuator/update';
const DELETE_VALUATOR = '/valuator/delete';
const ADD_DISPLAY_INFO = '/vehicle/display-info/create';

const UPLOAD_IMAGE = '/uploadImage';
const MAKE_LIST = '/vehicle/make';
const MODEL_LIST = '/vehicle/model';
const VARIANT_LIST = '/vehicle/variant';
const UPDATE_STATUS_URL = '/vehicle/changeVehicleStatus';
const CITY_LIST = '/getCityList';
const getChartList = (from: string, to: string) =>
  `/get_chart_data?from=${from}&to=${to}`;

const getCsvFiles = (from: string, to: string, type: string) =>
  `/get_chart_data_csv?from=${from}&to=${to}&type=${type}`;

const getVehicleUrl = (
  vehicle_status: string,
  model: string,
  from: string,
  to: string,
) =>
  `/vehicle/list?vehicle_status=${vehicle_status}&model=${model}&from=${from}&to=${to}`;
const addVehicleFormurl = (id: string) =>
  id ? `/vehicle/createForm/${id}` : '/vehicle/createForm';
const getDisplayInfoUrl = (id: string) => `/vehicle/display-info/edit/${id}`;
const updateDisplayInfoUrl = (id: string) =>
  `/vehicle/display-info/update/${id}`;

const uploadCardImageUrl = (id: string) => `/vehicle/car-images/create/${id}`;
const getCarImageUrl = (id: string) => `/vehicle/car-images/edit/${id}`;
const updateCarImageUrl = (id: string) => `/vehicle/car-images/update/${id}`;

const addCarDocumentsUrl = (id: string) =>
  `/vehicle/car-documents/create/${id}`;
const getCarDocumentsUrl = (id: string) => `/vehicle/car-documents/edit/${id}`;
const updateCarDocumentsUrl = (id: string) =>
  `/vehicle/car-documents/update/${id}`;

const addExteriorUrl = (id: string) => `/vehicle/exterior-img/create/${id}`;
const getExteriorUrl = (id: string) => `/vehicle/exterior-img/edit/${id}`;
const updateExteriorUrl = (id: string) => `/vehicle/exterior-img/update/${id}`;

const addExternelUrl = (id: string) => `vehicle/external-panel/create/${id}`;
const getExternelUrl = (id: string) => `/vehicle/external-panel/edit/${id}`;
const updateExternelUrl = (id: string) =>
  `/vehicle/external-panel/update/${id}`;

const addTyresUrl = (id: string) => `/vehicle/tyres/create/${id}`;
const getTyresUrl = (id: string) => `/vehicle/tyres/edit/${id}`;
const updateTyresUrl = (id: string) => `/vehicle/tyres/update/${id}`;

const addEngineUrl = (id: string) => `/vehicle/engine/create/${id}`;
const getEngineUrl = (id: string) => `/vehicle/engine/edit/${id}`;
const updateEngineUrl = (id: string) => `/vehicle/engine/update/${id}`;

const addElectricalsUrl = (id: string) => `/vehicle/electricals/create/${id}`;
const getElectricalUrl = (id: string) => `/vehicle/electricals/edit/${id}`;
const updateElectricalUrl = (id: string) => `/vehicle/electricals/update/${id}`;

const addSteeringUrl = (id: string) => `/vehicle/steering/create/${id}`;
const getSteeringUrl = (id: string) => `/vehicle/steering/edit/${id}`;
const updateSteeringUrl = (id: string) => `/vehicle/steering/update/${id}`;

const addSuspension = (id: string) =>
  `/vehicle/handling-and-suspension/create/${id}`;
const getSuspension = (id: string) =>
  `/vehicle/handling-and-suspension/edit/${id}`;
const updateSuspensionUrl = (id: string) =>
  `/vehicle/handling-and-suspension/update/${id}`;

const getVehicleDetailsUrl = (id: string) => `/vehicle/getVehicleDetails/${id}`;

export {
  LOGIN_SEND_OTP,
  LOGIN_SUBMIT,
  REGISTER_USER,
  GET_PROFILE,
  UPDATE_PROFILE,
  RESET_PASSWORD,
  LOGOUT_URL,
  GET_ALL_VALUATORS_LIST,
  UPDATE_VALUATOR,
  DELETE_VALUATOR,
  ADD_DISPLAY_INFO,
  UPLOAD_IMAGE,
  MAKE_LIST,
  MODEL_LIST,
  VARIANT_LIST,
  UPDATE_STATUS_URL,
  CITY_LIST,
  getChartList,
  getCsvFiles,
  getVehicleUrl,
  addVehicleFormurl,
  getDisplayInfoUrl,
  uploadCardImageUrl,
  updateDisplayInfoUrl,
  getCarImageUrl,
  updateCarImageUrl,
  addCarDocumentsUrl,
  getCarDocumentsUrl,
  updateCarDocumentsUrl,
  addExteriorUrl,
  updateExteriorUrl,
  getExteriorUrl,
  addExternelUrl,
  getExternelUrl,
  updateExternelUrl,
  addTyresUrl,
  getTyresUrl,
  updateTyresUrl,
  addEngineUrl,
  getEngineUrl,
  updateEngineUrl,
  addElectricalsUrl,
  getElectricalUrl,
  updateElectricalUrl,
  addSteeringUrl,
  getSteeringUrl,
  updateSteeringUrl,
  getVehicleDetailsUrl,
  addSuspension,
  getSuspension,
  updateSuspensionUrl,
};
