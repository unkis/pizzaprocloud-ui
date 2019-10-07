import { combineReducers, createStore } from 'redux';
import { languages, user, formDataState, cartProducts, settings } from './reducers';

export const appState = combineReducers({ languages, user, formDataState, cartProducts, settings } as any);
const testIsNew = localStorage.getItem('testIndex') && JSON.parse(localStorage.getItem('testIndex') as string);
const initialState = testIsNew ? JSON.parse(localStorage.getItem('pizza-redux') as string) : null;
let store = initialState ? createStore(appState, initialState) : createStore(appState);
localStorage.setItem('testIndex', JSON.stringify(true));
store.subscribe(() => localStorage.setItem('pizza-redux', JSON.stringify(store.getState())));

export default store;

