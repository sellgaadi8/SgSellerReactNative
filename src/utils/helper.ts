import {saveUserToken} from './localStorage';

export const postAuth = async (token: string) => {
  await saveUserToken(token);
};
