import store from './index';
import {
  LanguagesState, UserState, FormDataStateType, CartProductsState,
} from './reducersTypes';
import { categoriesState } from './reducers';

export interface State {
  languages: LanguagesState
  user: UserState
  formDataState: FormDataStateType
  cartProducts: CartProductsState
  categories: categoriesState
}

export type storeType = typeof store
