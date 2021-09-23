export interface State {
  isAuth: boolean;
  registrationTab: boolean
  headers: object
}

export interface Auth {
  email: string;
  password: string;
  passwordConfirmation?: string;
}
