export interface State {
  isAuth: boolean;
  registrationTab: boolean
}

export interface Auth {
  email: string;
  password: string;
  passwordConfirmation?: string;
}
