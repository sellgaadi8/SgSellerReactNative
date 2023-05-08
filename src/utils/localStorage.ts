import SInfo from 'react-native-sensitive-info';
import {TOKEN} from './constant';

export function saveUserToken(token: string): Promise<null> {
  return SInfo.setItem(TOKEN, token, {
    sharedPreferencesName: 'my_shared_prefs',
    keychainService: 'my_keychain',
  });
}

export function getUserToken(): Promise<string> {
  return SInfo.getItem(TOKEN, {
    sharedPreferencesName: 'my_shared_prefs',
    keychainService: 'my_keychain',
  });
}
