import { createStore } from 'redux';
import { appState } from './index';
import { initialFormDataState } from './reducers';
import { langType } from '../lang';
import {
  changeLanguage,
  addUser,
  logoutUser,
  addToFormData,
  updateAllFieldsOfFormData,
  clearAllFields
} from './actions';

const initialState = {
  languages: {
    lang: 'ru' as langType
  },
  user: {
    role: '',
    code: ''
  },
  formDataState: initialFormDataState
};

let store = createStore(appState, initialState);

describe('тесты на redux', () => {
  beforeEach(() => {
    store = createStore(appState, initialState)
  });

  test('должен изменять язык в store после события changeLanguage', () => {
    store.dispatch(changeLanguage('de'));

    expect(store.getState()).toMatchObject({...initialState, languages: { lang: 'de' }});
  });

  test('должен изменять данные пользователя в store после события addUser', () => {
    store.dispatch(addUser('test', '123'));

    expect(store.getState()).toMatchObject({...initialState, user: { role: 'test', code: '123' }});
  });

  test('должен удалять роль пользователя в store после события logoutUser', () => {
    store.dispatch(addUser('test', '123'));
    store.dispatch(logoutUser());

    expect(store.getState()).toMatchObject({...initialState, user: { role: '', code: '123' }});
  });

  test('должен добавлять поле в formDataState после события addToFormData', () => {
    store.dispatch(addToFormData('test', 'test'));

    expect(store.getState()).toMatchObject({...initialState, formDataState: { test: 'test' }});
  });

  test('должен изменять поля в formDataState после события updateAllFieldsOfFormData', () => {
    const fields = {
      customerNumber: 'test1',
      phoneNumber: 'test2',
      name: 'test3',
      street: 'test4',
      houseNumber: 'test5',
      plz: 'test6',
      city: 'test7',
      clientComment: 'test8',
      deliveryCost: '1,00'
    }
    store.dispatch(updateAllFieldsOfFormData(fields));

    expect(store.getState()).toMatchObject({...initialState, formDataState: fields});
  });

  test('должен сбрасывать поля в formDataState в начальное состояние после события clearAllFields', () => {
    const fields = {
      customerNumber: 'test1',
      phoneNumber: 'test2',
      name: 'test3',
      street: 'test4',
      houseNumber: 'test5',
      plz: 'test6',
      city: 'test7',
      clientComment: 'test8',
      deliveryCost: '1,00'
    }

    store.dispatch(updateAllFieldsOfFormData(fields));
    store.dispatch(clearAllFields());

    expect(store.getState()).toMatchObject({...initialState, formDataState: initialFormDataState});
  });
});
