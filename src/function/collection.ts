import collectionApi from 'src/api/collectionApi';
import { ICategoriesOrder } from 'src/models/categories';

interface IListCollectionItem {
  index: number;
  filter: string;
}
export async function addCollectionFunc(params: FormData) {
  const respon = await collectionApi.addCollection(params);
  return respon;
}
export async function getCollectionFunc() {
  const respon = await collectionApi.getCollection();
  return respon.data;
}
export async function getCollectionItemFunc({ queryKey }) {
  const [_, params] = queryKey;
  const respon = await collectionApi.getCollectionItem(params);
  return respon.data;
}
export async function orderCollectionFunc(params: ICategoriesOrder) {
  const respon = await collectionApi.orderCollection(params);
  return respon.data;
}
export async function filterCollectionByBelongToFunc(params: string) {
  // const respon = await collectionApi.orderCollection(params);
  return '';
}
