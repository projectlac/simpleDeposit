import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import history from '../utils/history';

const axiosJsonClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*/*',
    accept: '*/*'
  }
});
// Add a request interceptor
axiosJsonClient.interceptors.request.use(
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
axiosJsonClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error+

    if (error.response.status === 401) {
      history.push(`${process.env.REACT_APP_BASE_NAME}/login`);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosJsonClient;
