export interface IBearerToken {
  token: string;
}

export interface IChangePassword {
  old_password: string;
  password: string;
  password_confirmation: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IChangeForgottenPassword {
  password: string;
  password_confirmation: string;
  password_token: string;
}

export interface IAuth {
  token: string;
}
