import collectionApi from 'src/api/collectionApi';
import { ICategoriesOrder } from 'src/models/categories';

export async function addCollectionFunc(params: FormData) {
  const respon = await collectionApi.addCollection(params);
  return respon;
}
export async function getCollectionFunc() {
  const respon = await collectionApi.getCollection();
  return respon.data;
}
export async function getCollectionItemFunc() {
  const respon = await collectionApi.getCollectionItem();
  return respon.data;
}
export async function orderCollectionFunc(params: ICategoriesOrder) {
  const respon = await collectionApi.orderCollection(params);
  return respon.data;
}
