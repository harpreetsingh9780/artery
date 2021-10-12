import axios from 'axios';
import { Config } from 'App/Config';
import { store } from '../Stores/store';
import { LoginActions } from '../Stores/Login/Actions';

export const HttpClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

// todo: add authentication headers.
HttpClient.interceptors.request.use(
  (config) => {
    try {
      const state = store.getState();
      // eslint-disable-next-line no-param-reassign
      config.headers['X-Auth'] = state.login.authToken;
    } catch (e) {
      //
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// todo: handle 401 & 403 errors
HttpClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.error) {
      const error = new Error('API Error');
      error.response = response;
      return Promise.reject(error);
    }
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(LoginActions.logout());
    }
    return Promise.reject(error);
  }
);
