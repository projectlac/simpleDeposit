import { PromiseApi } from 'src/models';
import { ICategoriesOrder } from 'src/models/categories';
import axiosFormDataClient from './axiosFormDataClient';
import axiosJsonClient from './axiosJsonClient';
const categoriesApi = {
  addCategories(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.post('Categories/create-category', params);
  },
  getCategories(): Promise<PromiseApi> {
    return axiosFormDataClient.get(
      'Categories/list-category?pageSize=13&pageIndex=0'
    );
  },
  getCategoriesById(id: string): Promise<PromiseApi> {
    return axiosFormDataClient.get(
      `Categories/get-category-by-id?categoryId=${id}`
    );
  },
  updateCategory(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.put(`Categories/update-category`, params);
  },
  orderCategories(param: ICategoriesOrder): Promise<PromiseApi> {
    return axiosJsonClient.post('Categories/update-order-category', param);
  },
  deleteCategories(id: string): Promise<PromiseApi> {
    return axiosJsonClient.delete('Categories/delete-category', { data: id });
  }
};
export default categoriesApi;
