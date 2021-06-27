import { RootState } from './../types';

export const getPostingsSelector = (state: RootState) => state.postings as any;
