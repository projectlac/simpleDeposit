import { PromiseApi } from 'src/models';
import axiosJsonClient from './axiosJsonClient';
const userApi = {
  logOut(): Promise<PromiseApi> {
    return axiosJsonClient.post('Users/logout');
  }
};
export default userApi;
