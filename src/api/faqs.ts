import { PromiseApi } from 'src/models';
import axiosFormDataClient from './axiosFormDataClient';
import axiosJsonClient from './axiosJsonClient';
const faqApi = {
  addFaq(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.post('FAQs/create-faq', params);
  },
  getFaq(): Promise<PromiseApi> {
    return axiosJsonClient.get(`FAQs/list-faq?pageSize=${10}&pageIndex=${0}`);
  },
  updateFaq(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.put(`FAQs/update-faq`, params);
  },
  deleteFaq(id: string): Promise<PromiseApi> {
    return axiosJsonClient.delete('FAQs/delete-faq', { data: id });
  },
  getFAQById(id: string): Promise<PromiseApi> {
    return axiosFormDataClient.get(`FAQs/get-faq-by-id?faqId=${id}`);
  }
};
export default faqApi;
