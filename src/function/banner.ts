import bannerApi from 'src/api/banner';

export async function addBannerFunc(params: FormData) {
  const respon = await bannerApi.addBanner(params);
  return respon;
}
export async function getBannerFunc() {
  const respon = await bannerApi.getBanner();
  return respon.data;
}
export async function updateBannerFunc(params: FormData) {
  const respon = await bannerApi.updateBanner(params);
  return respon.data;
}
