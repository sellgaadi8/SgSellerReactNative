const LOGIN_SEND_OTP = '/getOtp';
const LOGIN_SUBMIT = '/login';
const GET_PROFILE = '/getProfileDetails';
const UPDATE_PROFILE = '/updateProfileDetails';
const RESET_PASSWORD = '/changePassword';
const LOGOUT_URL = '/logout';
const GET_ALL_VALUATORS_LIST = '/valuator/getAllValuatorDetails';
const UPDATE_VALUATOR = '/valuator/update';
const DELETE_VALUATOR = '/valuator/delete';
const ADD_DISPLAY_INFO = '/vehicle/display-info/create';
const VEHICLE = '/vehicle/list';
const UPLOAD_IMAGE = '/uploadImage';
const MAKE_LIST = '/vehicle/make';
const MODEL_LIST = '/vehicle/model';
const VARIANT_LIST = '/vehicle/variant';

const addVehicleFormurl = (id?: string) =>
  id ? `/vehicle/createForm/${id}` : '/vehicle/createForm';
const getDisplayInfoUrl = (id: string) => `/vehicle/display-info/edit/${id}`;
const updateDisplayInfoUrl = (id: string) =>
  `/vehicle/display-info/update/${id}`;

const uploadCardImageUrl = (id: string) => `/vehicle/car-images/create/${id}`;
const getCarImageUrl = (id: string) => `/vehicle/car-images/edit/${id}`;
const updateCarImageUrl = (id: string) => `/vehicle/car-images/update/${id}`;

export {
  LOGIN_SEND_OTP,
  LOGIN_SUBMIT,
  GET_PROFILE,
  UPDATE_PROFILE,
  RESET_PASSWORD,
  LOGOUT_URL,
  GET_ALL_VALUATORS_LIST,
  UPDATE_VALUATOR,
  DELETE_VALUATOR,
  ADD_DISPLAY_INFO,
  VEHICLE,
  UPLOAD_IMAGE,
  MAKE_LIST,
  MODEL_LIST,
  addVehicleFormurl,
  getDisplayInfoUrl,
  uploadCardImageUrl,
  updateDisplayInfoUrl,
  getCarImageUrl,
  updateCarImageUrl,
  VARIANT_LIST,
};
