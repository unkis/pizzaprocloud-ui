import { LeftMenu } from './index';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

import store from '../../redux';

describe('LeftMenu', () => {
  describe('snapshot-тесты на компонент LeftMenu', () => {
    test('должен вернуть полный шаблон компонента(snapshot)', () => {
      expect(mount(
        <Router>
          <Provider store={store}>
            <LeftMenu/>
          </Provider>
        </Router>)).toMatchSnapshot();
    });
  });
  describe('unit-тесты на компонент LeftMenu', () => {
    test('при нажатии на кнопку Выйти чистит localStorage', () => {
      const localStorageCache = {"languages":{"lang":"ru"},"user":{"role":"admin","code":"123"},"formDataState":{"customerNumber":"","phoneNumber":"","name":"","street":"","houseNumber":"","plz":"","city":"","clientComment":"","deliveryCost":"0,00"}};
      localStorage.setItem('pizza-redux', JSON.stringify(localStorageCache));
      const component = mount(
        <Router>
          <Provider store={store}>
            <LeftMenu/>
          </Provider>
        </Router>);

      const logoutButton = component.find('li.ant-menu-item.logout-button');

      logoutButton.simulate('click');

      expect(JSON.parse(localStorage.getItem('pizza-redux')).user.role).toBe('');
    });
    //TODO: написать тесты на смену языка
  });
});
