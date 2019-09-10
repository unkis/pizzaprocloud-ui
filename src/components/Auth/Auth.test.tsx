import { Auth } from './index';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

import store from '../../redux';

describe('Auth', () => {
  describe('snapshot-тесты на компонент Auth', () => {
    test('должен вернуть полный шаблон компонента(snapshot)', () => {
      expect(mount(
        <Router>
          <Provider store={store}>
            <Auth/>
          </Provider>
        </Router>)).toMatchSnapshot();
    });
  });
  describe('unit-тесты на компонент Auth', () => {
    test('должен появляться фокус на первом поле формы при загрузке страницы', () => {
    const component = mount(
      <Router>
        <Provider store={store}>
          <Auth/>
        </Provider>
      </Router>);
      const codeInputField = component.find('input#normal_login_code');
    expect(codeInputField.props().autoFocus).toBe(true);
    });

    test('должно появляться предупреждение о некорректном вводе при вводе букв в поле Номер организации', () => {
      const component = mount(
      <Router>
        <Provider store={store}>
          <Auth/>
        </Provider>
      </Router>);
      const codeInputField = component.find('input#normal_login_code');
      codeInputField.simulate('change', { target: { value: 'Hello' } });
      const warningMessage = component.find('.ant-form-explain');
      expect(warningMessage.text()).toBe('Разрешены только цифры');
    });

    test('должны появляться предупреждения о некорректном вводе при отправке пустой формы', () => {
      const component = mount(
      <Router>
        <Provider store={store}>
          <Auth/>
        </Provider>
      </Router>);
      const formElement = component.find('form.login-form');
      formElement.simulate('submit');
      const warnings = [
        'Введите код',
        'Введите имя пользователя',
        'Введите пароль'
      ];   
      component.find('.ant-form-explain').forEach((warning, idx) => expect(warning.text()).toBe(warnings[idx]));
    });

    test('должна отправляться корректно заполненная форма', () => {
      const component = mount(
      <Router>
        <Provider store={store}>
          <Auth/>
        </Provider>
      </Router>);
      const formElement = component.find('form.login-form');
      const codeInputField = component.find('input#normal_login_code');
      const usernameInputField = component.find('input#normal_login_username');
      const passwordInputField = component.find('input#normal_login_password');
      codeInputField.simulate('change', { target: { value: 123 }});
      usernameInputField.simulate('change', { target: { value: 'test' }});
      passwordInputField.simulate('change', { target: { value: 'test' }});
      formElement.simulate('submit');
      expect(window.location.pathname).toBe('/menu');
    });

    test('должен появляться Alert при неправильном логине/пароле', () => {
      const component = mount(
      <Router>
        <Provider store={store}>
          <Auth/>
        </Provider>
      </Router>);
      const formElement = component.find('form.login-form');
      const codeInputField = component.find('input#normal_login_code');
      const usernameInputField = component.find('input#normal_login_username');
      const passwordInputField = component.find('input#normal_login_password');
      codeInputField.simulate('change', { target: { value: 123 }});
      usernameInputField.simulate('change', { target: { value: 'notRight' }});
      passwordInputField.simulate('change', { target: { value: 'notRight' }});
      formElement.simulate('submit');
      const alert = component.find('.ant-alert-message');
      expect(alert.text()).toBe('Вы неверно ввели логин или пароль');
    });
  });
})

