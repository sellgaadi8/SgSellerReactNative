import {Alert} from 'react-native';
import Globals from './globals';
import {saveTokenValidity, saveUserToken} from './localStorage';

export const postAuth = async (token: string) => {
  await saveUserToken(token);
  const time = getTokenExpiry();
  Globals.instance().setTokenValidity(time);
  saveTokenValidity(time);
};

export const getTokenExpiry = () => {
  // Setting the token expiry
  const now = new Date();
  // Add 1 day 1440 mins
  now.setMinutes(now.getMinutes() + 1440);
  return new Date(now).getTime();
};

export function showAlert(
  msg: string,
  onSuccess?: () => void,
  title?: string,
  onCancel?: () => void,
  cancelable = true,
) {
  Alert.alert(
    title || 'Impact Guru',
    msg,
    [
      {text: 'No', onPress: onCancel, style: 'cancel'},
      {text: 'Yes', onPress: onSuccess},
    ],
    {cancelable},
  );
}
