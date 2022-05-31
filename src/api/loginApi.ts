import { LoginForm, ParamChangePassword, PromiseApi } from '../models/';
import axiosClient from './axiosClient';

const loginApi = {
  login(params: LoginForm): Promise<PromiseApi> {
    const url = '/Users/login';
    return axiosClient.post(url, params);
  },
  forgotPassword(params:string):Promise<PromiseApi> {
    return axiosClient.post(`/Users/forgot-password?email=${params}`);
  },
  changePassword(params:ParamChangePassword): Promise<PromiseApi> {
    const url = '/Users/change-password';
    return axiosClient.post(url, params);}
};
export default loginApi;
