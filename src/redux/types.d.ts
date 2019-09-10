import store from './index';
import {
  LanguagesState,
  UserState,
  FormDataStateType } from './reducersTypes';

export interface State {
  languages: LanguagesState;
  user: UserState;
  formDataState: FormDataStateType;
}

export type storeType = typeof store;
