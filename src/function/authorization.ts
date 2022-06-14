import loginApi from 'src/api/loginApi';
import userApi from 'src/api/userApi';

export async function loginFunc({ email, password }) {
  const respon = await loginApi.login({
    email: email,
    password: password
  });
  return respon;
}
export async function forgotPasswordFunc(email) {
  const respon = await loginApi.forgotPassword(email);
  return respon;
}
export async function changePasswordFunc({
  email,
  temporaryPassword,
  newPassword,
  confirmNewPassword
}) {
  const respon = await loginApi.changePassword({
    email,
    temporaryPassword,
    newPassword,
    confirmNewPassword
  });
  return respon;
}
export async function logoutFunc() {
  const respon = await userApi.logOut();
  return respon;
}
