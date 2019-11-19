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
} as any);
const testIsNew = localStorage.getItem('testIndex5') && JSON.parse(localStorage.getItem('testIndex5') as string);
const initialState = testIsNew ? JSON.parse(localStorage.getItem('pizza-redux') as string) : null;
const store = initialState ? createStore(appState, initialState) : createStore(appState);
localStorage.setItem('testIndex5', JSON.stringify(true));
store.subscribe(() => localStorage.setItem('pizza-redux', JSON.stringify(store.getState())));

export default store;
