import {Alert, Permission} from 'react-native';
import Globals from './globals';
import {saveTokenValidity, saveUserToken} from './localStorage';
import {requestMultiple} from 'react-native-permissions';
import {Log} from '../axios';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

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
  now.setMinutes(now.getHours() + 24);
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

export const askMultipleAndroidPermissions = async (
  permissions: Permission[],
) => {
  try {
    const accepted = await requestMultiple([...permissions]);
    permissions.map(el => Log(el, accepted[el]));
  } catch (error: any) {
    Log('Permissions', error, 'ERROR');
  }
};

// Format date
export const formatDate = (
  date: string | number | Date,
  monthShort: boolean = false,
  pattern: DatePattern,
): string => {
  const convertedDate = new Date(date);

  if (isNaN(convertedDate.getTime())) {
    return date.toString();
  }

  let day = convertedDate.getDate() + '';
  let monthNumber: string | number = convertedDate.getMonth();
  let month = months[monthNumber];
  const year = convertedDate.getFullYear();
  let hours = convertedDate.getHours() + '';
  let minutes = convertedDate.getMinutes() + '';

  if (monthShort) {
    month = month.substr(0, 3);
  }

  if (day.length === 1) {
    day = '0' + day;
  }

  if (hours.length === 1) {
    hours = '0' + hours;
  }

  if (minutes.length === 1) {
    minutes = '0' + minutes;
  }

  monthNumber = monthNumber + 1;
  if (monthNumber < 10) {
    monthNumber = '0' + monthNumber;
  }

  switch (pattern) {
    case 'DD MM, YYYY':
      return `${day} ${month}, ${year}`;
    case 'DD-MM-YYYY':
      return `${day}-${monthNumber}-${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${monthNumber}-${day}`;
    case 'DD MM, YYYY HH:MM':
      return `${day} ${month}, ${year} - ${hours}:${minutes}`;
    case 'DD-MM':
      return `${day}-${month}`;
  }
};
