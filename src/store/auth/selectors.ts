import { RootState } from './../types';

export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getRegistrationTab = (state: RootState) => state.auth.registrationTab;
