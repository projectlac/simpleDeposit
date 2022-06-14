import faqApi from 'src/api/faqs';

export async function addFAQFunc(params: FormData) {
  const respon = await faqApi.addFaq(params);
  return respon;
}
export async function getFAQFunc() {
  const respon = await faqApi.getFaq();
  return respon.data;
}
export async function updateFAQFunc(params: FormData) {
  const respon = await faqApi.updateFaq(params);
  return respon.data;
}
