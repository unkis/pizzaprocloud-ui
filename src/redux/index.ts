import { combineReducers, createStore } from 'redux';
import { languages, user, formDataState, cartProducts } from './reducers';

export const appState = combineReducers({ languages, user, formDataState, cartProducts });
const initialState = JSON.parse(localStorage.getItem('pizza-redux') as string);
let store = initialState ? createStore(appState, initialState) : createStore(appState);

store.subscribe(() => localStorage.setItem('pizza-redux', JSON.stringify(store.getState())));

export default store;

