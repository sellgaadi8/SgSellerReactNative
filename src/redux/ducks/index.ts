import {combineReducers} from 'redux';
import login from './login';
import sendOtp from './sendOtp';

export default combineReducers({
  login,
  sendOtp,
});
