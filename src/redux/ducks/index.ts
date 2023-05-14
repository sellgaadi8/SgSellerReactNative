import {combineReducers} from 'redux';
import login from './login';
import sendOtp from './sendOtp';
import getProfile from './getProfile';
import updateProfile from './updateProfile';
import changePassword from './changePassword';
import global from './global';

export default combineReducers({
  login,
  sendOtp,
  getProfile,
  updateProfile,
  changePassword,
  global,
});
