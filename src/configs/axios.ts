import axios, { AxiosRequestConfig } from 'axios';
import { IS_DEV } from '../utils/constants';
import { devLog } from '../utils/helpers';
import { secureStorage } from './storage';

const API_SERVER = process?.env?.API_SERVER || '';

if (IS_DEV) devLog.log('\n\nAPI_SERVER', API_SERVER);

const reqConfig = {
  baseURL: API_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
};

const AXIOS = axios.create(reqConfig);

export const setAuthToken = (token?: string) => {
  AXIOS.interceptors.request.use(async (config: AxiosRequestConfig) => {
    let myConfig = config;
    const userToken = token || (await secureStorage.getItem('token'));

    if (userToken) {
      myConfig = {
        ...config,
        headers: {
          ...(config?.headers || {}),
          ...(userToken ? { Authorization: `Bearer ${userToken || ''}` } : {}),
        },
      };
    }

    return myConfig;
  });
};

setAuthToken();
export default AXIOS;
