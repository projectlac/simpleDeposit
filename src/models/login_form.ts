export interface LoginForm {
  userName: string;
  password: string;
}
export interface ParamChangePassword{
  email:string,
  temporaryPassword:string,
  newPassword:string,
  confirmNewPassword:string
}