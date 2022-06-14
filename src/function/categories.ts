import categoriesApi from 'src/api/categoriesApi';
import { ICategoriesOrder } from 'src/models/categories';

export async function addCategoriesFunc(params: FormData) {
  const respon = await categoriesApi.addCategories(params);
  return respon;
}
export async function getCategoriesFunc() {
  const respon = await categoriesApi.getCategories();
  return respon.data;
}
export async function orderCategoriesFunc(params: ICategoriesOrder) {
  const respon = await categoriesApi.orderCategories(params);
  return respon.data;
}
