import {combineReducers} from 'redux';
import login from './login';
import sendOtp from './sendOtp';
import getProfile from './getProfile';
import updateProfile from './updateProfile';
import changePassword from './changePassword';
import global from './global';
import logout from './logout';
import getAllValuators from './getAllValuators';
import updateValuator from './updateValuator';
import deleteValuator from './deleteValuator';
import addVehicleForm from './addVehicleForm';
import createDisplayInfo from './createDisplayInfo';
import editDisplayInfo from './editDisplayInfo';
import vehicleList from './vehicleList';
import uploadImage from './uploadImage';
import uploadCarImages from './uploadCarImages';

export default combineReducers({
  login,
  sendOtp,
  getProfile,
  updateProfile,
  changePassword,
  global,
  logout,
  getAllValuators,
  updateValuator,
  deleteValuator,
  addVehicleForm,
  createDisplayInfo,
  editDisplayInfo,
  vehicleList,
  uploadImage,
  uploadCarImages,
});
