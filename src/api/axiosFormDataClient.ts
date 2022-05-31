import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import history from 'src/utils/history';

const axiosFormDataClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*/*',
    accept: '*/*'
  }
});
// Add a request interceptor
axiosFormDataClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    let token = localStorage.getItem('access_token');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosFormDataClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      history.push(`${process.env.REACT_APP_BASE_NAME}/login`);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosFormDataClient;
