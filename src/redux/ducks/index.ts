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
import getModel from './getModel';
import getMake from './getMake';
import getVariant from './getVariant';
import updateDisplayInfo from './updateDisplayInfo';
import getCarImage from './getCarImage';
import updateCarImages from './updateCarImages';

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
  getModel,
  getVariant,
  getMake,
  updateDisplayInfo,
  getCarImage,
  updateCarImages,
});
