import { PromiseApi } from 'src/models';
import { ICategoriesOrder } from 'src/models/categories';
import axiosFormDataClient from './axiosFormDataClient';
import axiosJsonClient from './axiosJsonClient';
const collectionApi = {
  addCollection(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.post('Collections/create-collection', params);
  },
  getCollection(): Promise<PromiseApi> {
    return axiosFormDataClient.get(
      'Collections/list-special-collection?pageSize=13&pageIndex=0'
    );
  },
  getCollectionItem(): Promise<PromiseApi> {
    return axiosFormDataClient.get(
      'Collections/list-collection-item?pageSize=13&pageIndex=0'
    );
  },
  getCategoriesById(id: string): Promise<PromiseApi> {
    return axiosFormDataClient.get(
      `Collections/get-collection-by-id?collectionId=${id}`
    );
  },
  updatecollection(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.put(`Collections/update-collection`, params);
  },
  orderCollection(param: ICategoriesOrder): Promise<PromiseApi> {
    return axiosJsonClient.post('Collections/update-order-collection', param);
  },
  deleteCollection(id: string): Promise<PromiseApi> {
    return axiosJsonClient.delete('Collections/delete-collection', {
      data: id
    });
  }
};
export default collectionApi;
