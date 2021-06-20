export interface State {
  isAuth: boolean;
}

export interface Auth {
  email: string;
  password: string;
  passwordConfirmation?: string;
}
