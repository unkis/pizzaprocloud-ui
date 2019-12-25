import store from './index';
import {
  LanguagesState, UserState, FormDataStateType, CartProductsState,
} from './reducersTypes';
import { categoriesState, Article, Printer } from './reducers';

export interface State {
  languages: LanguagesState
  user: UserState
  formDataState: FormDataStateType
  cartProducts: CartProductsState
  categories: categoriesState[]
  articles: Article[]
  printers: Printer[]
  auth: { email?: string; authorized: boolean }
  voip: null | {
    ip: string
    login: string
    password: string
    provider: string
    registar: string
    connected: boolean
  }
}

export type storeType = typeof store
