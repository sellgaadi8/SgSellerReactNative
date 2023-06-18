import {Alert, Permission} from 'react-native';
import Globals from './globals';
import {saveTokenValidity, saveUserToken} from './localStorage';
import {requestMultiple} from 'react-native-permissions';
import {Log, cancelRequest} from '../axios';
import Snackbar from 'react-native-snackbar';
import {onLogout} from '../redux/ducks/logout';

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

export const handleError = (error: any, dispatch: any) => {
  if (error?.request?._response) {
    const urlParts = error.request._url.split('/');
    const endpoint =
      urlParts?.includes('login') || urlParts?.includes('getOtp');

    if (!endpoint && error.request.status === 401) {
      // Logout user
      cancelRequest('Not Authorized');
      console.log('401, ', error.request);
      dispatch(onLogout());
    } else {
      const err = JSON.parse(error.request._response);

      const {errors} = err;
      // This will show all the errors

      if (errors) {
        let concatErr = '';
        switch (typeof errors) {
          case 'string':
            concatErr = errors;

            break;
          case 'object':
            concatErr = '';
            Object.keys(errors).map((key, index) => {
              if (index !== 0) {
                concatErr += '\n';
              }
              concatErr += `${errors[key]}`;
            });
            break;
        }

        // dispatch(snackAction(concatErr, 'ERROR'));
        Snackbar.show({
          text: concatErr,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  } else if (error?.message) {
    Snackbar.show({
      text: error.message,
      backgroundColor: 'red',
      duration: Snackbar.LENGTH_SHORT,
    });
    // dispatch(snackAction(error.message, 'ERROR'));
  }
};
