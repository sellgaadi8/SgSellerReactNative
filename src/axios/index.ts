import axios, {AxiosRequestConfig} from 'axios';
import Globals from '../utils/globals';
import {deleteUserToken} from '../utils/localStorage';

const BASE_URL = 'http://3.110.1.47/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const Log = (tag: string, ...msg: any) => {
  console.log(tag, ...msg);
};

export async function checkTokenValidity(config: AxiosRequestConfig) {
  const urlParts = config.url!.split('/');
  // Don't run this for following endpoints
  // include Verify user API
  // Because token is not required on below endpoints so it will be infinite loop
  const endpoint = urlParts.includes('getOtp') || urlParts.includes('login');

  const validity =
    +Globals.instance().getTokenValidity() - new Date().getTime();
  if (!endpoint && validity <= 0) {
    // Token is expired
    deleteUserToken();
  }
}

axiosInstance.interceptors.request.use(
  // On Success
  async config => {
    await checkTokenValidity(config);

    // Attach token to header
    if (config.headers?.common) {
      // @ts-ignore
      config.headers.common['Access-Token'] = await getDycryptToken();
    }

    Log('Axios Request', '================');
    Log('Axios Request', 'Request BASE URL - ', BASE_URL);
    Log('Axios Request', 'Request URL - ', config.url);
    Log('Axios Request', 'Request Headers - ', config.headers);
    if (config.data) {
      Log('Axios Request', 'Request Body - ', config.data);
    }
    Log('Axios Request', '================');

    return config;
  },
  // On Error
  error => {
    return Promise.reject(error);
  },
);

// Interceptor

axiosInstance.interceptors.response.use(
  // On Success
  async response => {
    Log('Axios Response', '================');
    Log('Axios Response', 'Request status - ', response.status);
    Log('Axios Response', 'Request Data - ', response.data);
    Log('Axios Response', '================');

    return response;
  },
  // On Error
  async error => {
    Log('Axios Response', error);

    if (error?.request?._response) {
      Log('Axios Response', error.request._response);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
