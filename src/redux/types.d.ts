import store from './index';
import {
  LanguagesState,
  UserState,
  FormDataStateType,
  CartProductsState
 } from './reducersTypes';

export interface State {
  languages: LanguagesState;
  user: UserState;
  formDataState: FormDataStateType;
  cartProducts: CartProductsState;
}

export type storeType = typeof store;
