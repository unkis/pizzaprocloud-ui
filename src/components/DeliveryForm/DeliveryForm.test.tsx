import DeliveryForm from './index';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

import store from '../../redux';

describe('DeliveryForm', () => {
  describe('snapshot-тесты на компонент DeliveryForm', () => {
    test('должен вернуть полный шаблон компонента(snapshot)', () => {
      expect(mount(
        <Router>
          <Provider store={store}>
            <DeliveryForm/>
          </Provider>
        </Router>)).toMatchSnapshot();
    });
  });
  describe('unit-тесты на компонент DeliveryForm', () => {
    test('должен появляться фокус на первом поле формы при загрузке страницы', () => {
      const component = mount(
        <Router>
          <Provider store={store}>
            <DeliveryForm/>
          </Provider>
        </Router>);
      const phoneNumberInputField = component.find('input#phoneNumber');

      expect(phoneNumberInputField.props().autoFocus).toBe(true);
    });

    test('должно появляться предупреждение о некорректном вводе при вводе букв в поле для цифр', () => {
      const component = mount(
      <Router>
        <Provider store={store}>
          <DeliveryForm/>
        </Provider>
      </Router>);
      const customerNumberInputField = component.find('input#customerNumber');
      const phoneNumberInputField = component.find('input#phoneNumber');
      const houseNumberInputField = component.find('input#delivery_form_houseNumber');
      const plzInputField = component.find('input#delivery_form_plz');

      customerNumberInputField.simulate('change', { target: { value: 'Hello' } });
      phoneNumberInputField.simulate('change', { target: { value: 'Hello' } });
      houseNumberInputField.simulate('change', { target: { value: 'Hello' } });
      plzInputField.simulate('change', { target: { value: 'Hello' } });

      const warningMessages = component.find('.ant-form-explain');

      expect(warningMessages).toHaveLength(4);
      warningMessages.forEach(warningMessage =>  expect(warningMessage.text()).toBe('Разрешены только цифры'));
    });

    test('должны появляться предупреждения о некорректном вводе при отправке пустой формы', () => {
      const component = mount(
      <Router>
        <Provider store={store}>
          <DeliveryForm/>
        </Provider>
      </Router>);
      const formElement = component.find('form');
      formElement.simulate('submit');
      const warnings = [
        'Разрешены только цифры',
        'Разрешены только цифры',
        'Введите имя клиента',
        'Введите название города',
        'Введите название улицы',
        'Введите номер дома',
        'Введите почтовый индекс'
      ];

      component.find('.ant-form-explain').forEach((warning, idx) => expect(warning.text()).toBe(warnings[idx]));
    });

    test('должна отправляться корректно заполненная форма', () => {
      const component = mount(
      <Router>
        <Provider store={store}>
          <DeliveryForm/>
        </Provider>
      </Router>);
      const formElement = component.find('form');
      const customerNumberInputField = component.find('input#customerNumber');
      const phoneNumberInputField = component.find('input#phoneNumber');
      const nameInputField = component.find('input#name');
      const cityInputField = component.find('input#delivery_form_city');
      const streetInputField = component.find('input#delivery_form_street');
      const houseNumberInputField = component.find('input#delivery_form_houseNumber');
      const plzInputField = component.find('input#delivery_form_plz');

      customerNumberInputField.simulate('change', { target: { value: 123 }});
      phoneNumberInputField.simulate('change', { target: { value: 12345678900 }});
      nameInputField.simulate('change', { target: { value: 'test' }});
      streetInputField.simulate('change', { target: { value: 'test' }});
      cityInputField.simulate('change', { target: { value: 'test' }});
      houseNumberInputField.simulate('change', { target: { value: 6 }});
      plzInputField.simulate('change', { target: { value: 123456 }});

      formElement.simulate('submit');

      expect(window.location.pathname).toBe('/finish');
    });

    test('при нажатии на ESC форма очищается', () => {
      const component = mount(
      <Router>
        <Provider store={store}>
          <DeliveryForm/>
        </Provider>
      </Router>);

      const formElement = component.find('form');

      const customerNumberInputField = component.find('input#customerNumber');
      const phoneNumberInputField = component.find('input#phoneNumber');
      const nameInputField = component.find('input#name');
      const cityInputField = component.find('input#delivery_form_city');
      const streetInputField = component.find('input#delivery_form_street');
      const houseNumberInputField = component.find('input#delivery_form_houseNumber');
      const plzInputField = component.find('input#delivery_form_plz');

      customerNumberInputField.simulate('change', { target: { value: 123 }});
      phoneNumberInputField.simulate('change', { target: { value: 12345678900 }});
      nameInputField.simulate('change', { target: { value: 'test' }});
      streetInputField.simulate('change', { target: { value: 'test' }});
      cityInputField.simulate('change', { target: { value: 'test' }});
      houseNumberInputField.simulate('change', { target: { value: 6 }});
      plzInputField.simulate('change', { target: { value: 123456 }});

      formElement.simulate('keydown', { key: 'Escape' });

      const inputs = component.find('input');

      inputs.forEach(input => expect(input.props().value).toBe(''));
    });

    test('при нажатии на кнопку Очистить форма очищается', () => {
      const component = mount(
      <Router>
        <Provider store={store}>
          <DeliveryForm/>
        </Provider>
      </Router>);

      const resetButton = component.find('.ant-btn-danger');

      const customerNumberInputField = component.find('input#customerNumber');
      const phoneNumberInputField = component.find('input#phoneNumber');
      const nameInputField = component.find('input#name');
      const cityInputField = component.find('input#delivery_form_city');
      const streetInputField = component.find('input#delivery_form_street');
      const houseNumberInputField = component.find('input#delivery_form_houseNumber');
      const plzInputField = component.find('input#delivery_form_plz');

      customerNumberInputField.simulate('change', { target: { value: 123 }});
      phoneNumberInputField.simulate('change', { target: { value: 12345678900 }});
      nameInputField.simulate('change', { target: { value: 'test' }});
      streetInputField.simulate('change', { target: { value: 'test' }});
      cityInputField.simulate('change', { target: { value: 'test' }});
      houseNumberInputField.simulate('change', { target: { value: 6 }});
      plzInputField.simulate('change', { target: { value: 123456 }});

      resetButton.simulate('click');

      const inputs = component.find('input');

      inputs.forEach(input => expect(input.props().value).toBe(''));
    });

    test('при нажатии на F2 форма отправляется', () => {
      const component = mount(
      <Router>
        <Provider store={store}>
          <DeliveryForm/>
        </Provider>
      </Router>);

      const formElement = component.find('form');

      const customerNumberInputField = component.find('input#customerNumber');
      const phoneNumberInputField = component.find('input#phoneNumber');
      const nameInputField = component.find('input#name');
      const cityInputField = component.find('input#delivery_form_city');
      const streetInputField = component.find('input#delivery_form_street');
      const houseNumberInputField = component.find('input#delivery_form_houseNumber');
      const plzInputField = component.find('input#delivery_form_plz');

      customerNumberInputField.simulate('change', { target: { value: 123 }});
      phoneNumberInputField.simulate('change', { target: { value: 12345678900 }});
      nameInputField.simulate('change', { target: { value: 'test' }});
      streetInputField.simulate('change', { target: { value: 'test' }});
      cityInputField.simulate('change', { target: { value: 'test' }});
      houseNumberInputField.simulate('change', { target: { value: 6 }});
      plzInputField.simulate('change', { target: { value: 123456 }});

      formElement.simulate('keydown', { key: 'F2' });

      expect(window.location.pathname).toBe('/finish');
    });

    test.skip('при нажатии на кнопку Продолжить заказ форма отправляется', () => {//FIXME: расскипать
      const component = mount(
      <Router>
        <Provider store={store}>
          <DeliveryForm/>
        </Provider>
      </Router>);

      const sendFormButton = component.find('.ant-btn-primary');

      const customerNumberInputField = component.find('input#customerNumber');
      const phoneNumberInputField = component.find('input#phoneNumber');
      const nameInputField = component.find('input#name');
      const cityInputField = component.find('input#delivery_form_city');
      const streetInputField = component.find('input#delivery_form_street');
      const houseNumberInputField = component.find('input#delivery_form_houseNumber');
      const plzInputField = component.find('input#delivery_form_plz');

      customerNumberInputField.simulate('change', { target: { value: 123 }});
      phoneNumberInputField.simulate('change', { target: { value: 12345678900 }});
      nameInputField.simulate('change', { target: { value: 'test' }});
      streetInputField.simulate('change', { target: { value: 'test' }});
      cityInputField.simulate('change', { target: { value: 'test' }});
      houseNumberInputField.simulate('change', { target: { value: 6 }});
      plzInputField.simulate('change', { target: { value: 123456 }});

      sendFormButton.simulate('click');

      expect(window.location.pathname).toBe('/finish');
    });
  });
})

