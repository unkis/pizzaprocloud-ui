import { combineReducers, createStore } from 'redux';
import {
  languages,
  user,
  formDataState,
  cartProducts,
  settings,
  categories,
  articles,
  printers,
  auth,
} from './reducers';

export const appState = combineReducers({
  languages,
  user,
  formDataState,
  cartProducts,
  settings,
  categories,
  articles,
  printers,
  auth,
} as any);
const testIsNew = localStorage.getItem('testIndex6') && JSON.parse(localStorage.getItem('testIndex6') as string);
const initialState = testIsNew ? JSON.parse(localStorage.getItem('pizza-redux') as string) : null;
const store = initialState ? createStore(appState, initialState) : createStore(appState);
localStorage.setItem('testIndex6', JSON.stringify(true));
store.subscribe(() => localStorage.setItem('pizza-redux', JSON.stringify(store.getState())));

export default store;
