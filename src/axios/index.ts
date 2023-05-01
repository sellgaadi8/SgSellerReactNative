import axios from 'axios';

const BASE_URL = 'http://3.110.1.47/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const Log = (tag: string, ...msg: any) => {
  console.log(tag, ...msg);
};

axiosInstance.interceptors.request.use(
  // On Success
  async config => {
    // Using mutex to avoid calling refresh token multiple times
    // It will release the lock after token is refresh when expired

    // NetInfo.fetch().then((state: any) => {
    //   if (!state.isConnected && !state.isWifiEnabled) {
    //     cancelRequest('Not Connected');
    //   }
    // });

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
