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
import addCarDocument from './addCarDocument';
import updateCarDocument from './updateCarDocument';
import getCarDocuments from './getCarDocuments';
import addExterior from './addExterior';
import updateExterior from './updateExterior';
import getExterior from './getExterior';
import updateExternal from './updateExternal';
import addExternal from './addExternal';
import getExternal from './getExternal';
import addTyres from './addTyres';
import updateTyres from './updateTyres';
import getTyres from './getTyres';
import addEngine from './addEngine';
import updateEngine from './updateEngine';
import getEngine from './getEngine';
import addElectrical from './addElectrical';
import updateElectrical from './updateElectrical';
import getElectrical from './getElectrical';
import addSteering from './addSteering';
import updateSteering from './updateSteering';
import getSteering from './getSteering';
import getVehicleDetails from './getVehicleDetails';
import updateVehicleForm from './updateVehicleForm';

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
  addCarDocument,
  updateCarDocument,
  getCarDocuments,
  addExterior,
  updateExterior,
  getExterior,
  updateExternal,
  addExternal,
  getExternal,
  addTyres,
  updateTyres,
  getTyres,
  addEngine,
  updateEngine,
  getEngine,
  addElectrical,
  updateElectrical,
  getElectrical,
  addSteering,
  updateSteering,
  getSteering,
  getVehicleDetails,
  updateVehicleForm,
});
