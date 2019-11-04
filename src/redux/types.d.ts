import store from './index';
import {
  LanguagesState, UserState, FormDataStateType, CartProductsState,
} from './reducersTypes';
import { categoriesState, Article } from './reducers';

export interface State {
  languages: LanguagesState
  user: UserState
  formDataState: FormDataStateType
  cartProducts: CartProductsState
  categories: categoriesState[]
  articles: Article[]
}

export type storeType = typeof store
