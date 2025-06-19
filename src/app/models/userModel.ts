export interface UserModel {
  name: string;
  mail: string;
  password: string;
  newPassword?: string;
  phone: string;
  surname: string;
  token: string | null;
}
