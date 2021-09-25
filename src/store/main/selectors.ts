import { RootState } from '../types';

export const getPostingsMainSelector = (state: RootState) => state.postingsMain as any;
