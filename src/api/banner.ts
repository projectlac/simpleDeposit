import { PromiseApi } from 'src/models';
import axiosFormDataClient from './axiosFormDataClient';
import axiosJsonClient from './axiosJsonClient';
const bannerApi = {
  addBanner(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.post('Banners/create-banner', params);
  },
  getBanner(): Promise<PromiseApi> {
    return axiosJsonClient.get(
      `Banners/list-banner?pageSize=${10}&pageIndex=${0}`
    );
  },
  updateBanner(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.put(`Banners/update-banner`, params);
  },
  deleteBanner(id: string): Promise<PromiseApi> {
    return axiosJsonClient.delete('Banners/delete-banner', { data: id });
  }
};
export default bannerApi;
