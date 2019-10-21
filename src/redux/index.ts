import { combineReducers, createStore } from 'redux';
import {
  languages, user, formDataState, cartProducts, settings, categories,
} from './reducers';

export const appState = combineReducers({
  languages,
  user,
  formDataState,
  cartProducts,
  settings,
  categories,
} as any);
const testIsNew = localStorage.getItem('testIndex2') && JSON.parse(localStorage.getItem('testIndex2') as string);
const initialState = testIsNew ? JSON.parse(localStorage.getItem('pizza-redux') as string) : null;
const store = initialState ? createStore(appState, initialState) : createStore(appState);
localStorage.setItem('testIndex2', JSON.stringify(true));
store.subscribe(() => localStorage.setItem('pizza-redux', JSON.stringify(store.getState())));

export default store;
