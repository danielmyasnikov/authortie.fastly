import { RootState } from './../types';

export const getIsAuth = (state: RootState) => state.auth.isAuth;
