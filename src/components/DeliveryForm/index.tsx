import React, {
  useReducer, useEffect, useCallback, useState, useMemo,
} from 'react';
import {
  Button, Form, Input, AutoComplete, Select, Divider, Card, Layout,
} from 'antd';

import { withRouter } from 'react-router-dom';
import { connect, MapDispatchToPropsNonObject, MapStateToPropsParam } from 'react-redux';

// types
import { Action } from 'redux';
import { DeliveryFormProps } from './DeliveryFormTypes';
import { langType, langMap } from '../../lang';

import fakeBD from '../../fakeBD';

import fieldNames from '../../constants/fieldNames';
import { selectValues } from '../../constants/selectValues';

import { initialFormDataState } from '../../redux/reducers';
import { addToFormData, updateAllFieldsOfFormData, clearAllFields } from '../../redux/actions';

import { ROOT_URL } from '../../constants/rootUrl';
import { Header } from '../Header';
import { DeliveryForm as DeliveryFormNew } from '../DeliveryForm2';
import { NavigationButtons } from '../NavigationButtons';

import './DeliveryPage.css';

const { /* Header, */ Content } = Layout;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    lg: { span: 12 },
    xl: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    lg: { span: 12 },
    xl: { span: 12 },
  },
};

const dataSourceActions = {
  ADD_TO_DATA_SOURCE: 'ADD_TO_DATA_SOURCE',
};

type dataSourceReducerTypes = typeof dataSourceActions.ADD_TO_DATA_SOURCE
interface dataSourceReducerAction extends Action<dataSourceReducerTypes> {
  dataSourceName: string
  dataSourceData: string[]
}

function dataSourceReducer(state: any, action: dataSourceReducerAction) {
  // FIXME
  switch (action.type) {
    case dataSourceActions.ADD_TO_DATA_SOURCE: {
      return {
        ...state,
        [action.dataSourceName]: action.dataSourceData,
      };
    }
  }
}

const addToDataSource = (dataSourceName: string, dataSourceData: string[]) => ({
  type: dataSourceActions.ADD_TO_DATA_SOURCE,
  dataSourceName,
  dataSourceData,
});

const initialDataSourceState: any = {
  // TODO: add types
  [fieldNames.customerNumber]: [],
  [fieldNames.phoneNumber]: [],
  [fieldNames.customerNumber]: [],
  [fieldNames.phoneNumber]: [],
  [fieldNames.name]: [],
  [fieldNames.street]: [],
  [fieldNames.houseNumber]: [],
  [fieldNames.plz]: [],
  [fieldNames.city]: [],
  [fieldNames.clientComment]: [],
  [fieldNames.deliveryCost]: [],
};

const tryToFetchUser = (fieldId: string, fieldValue: string) => fakeBD.customers.find(
  (customer: any) => customer[fieldId] && customer[fieldId].toString() === fieldValue,
);

const compareTwoObjects = (object1: any, object2: any) => {
  for (const [key, value] of Object.entries(object1)) {
    if (object2[key] !== value) return false;
  }
  return true;
};

const mapDispatchToProps: MapDispatchToPropsNonObject<any, any> = (dispatch) => ({
  addDataToFormData(id: string, value: string) {
    dispatch(addToFormData(id, value));
  },
  updateFieldsOfFormData(newState: any) {
    dispatch(updateAllFieldsOfFormData(newState));
  },
  clearFields() {
    dispatch(clearAllFields());
  },
});

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state) => ({
  formDataState: state.formDataState,
  lang: state.languages.lang,
  shopAddress: state.settings.shopAddress,
});

const onlyNumbersNormalize = (value: string | number = '', prevValue: string | number = '') => (/^[0-9]*$/.test(value.toString()) ? value : prevValue);

const startsWithUpperCaseNormalizer = (value: string) => {
  if (!value || !value[0]) {
    return '';
  }
  return `${value[0].toLocaleUpperCase()}${value.slice(1)}`;
};

enum Buttons {
  PHONE_MONITOR = 'PHONE_MONITOR',
  TABLE_ORDERS = 'TABLE_ORDERS',
  SELF_PICK_UP = 'SELF_PICK_UP',
  INNER = 'INNER',
}

const idToName: { [key: string]: string } = {
  customerNumber: 'Kundennummer',
  phoneNumber: 'Telefonnummer',
  name: 'Name',
  city: 'Stadt',
  street: 'Strassen',
  houseNumber: 'Hausnummer',
  plz: 'PLZ',
  clientComment: 'Bemerkung',
  deliveryCost: 'Anfahrtskosten',
};
const DeliveryForm = Form.create<DeliveryFormProps>({ name: 'delivery_form' })(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    withRouter(
      ({
        lang,
        formDataState,
        addDataToFormData,
        clearFields,
        updateFieldsOfFormData,
        form: {
          getFieldDecorator, setFieldsValue, getFieldsValue, setFieldValue,
        },
        form,
        history,
        shopAddress,
      }: any) => {
        useEffect(() => {
          const timeoutId = setTimeout(() => {
            // (window as any).webphone_api.onLoaded(() => {
            //   (window as any).webphone_api.onCallStateChange((...args: any[]) => {
            //     if (args[0] && args[0] === 'callSetup') {
            //       setFieldsValue({
            //         [fieldNames.phoneNumber]: args[2],
            //       });
            //     }
            //   });
            // });
          }, 1000);
          return () => clearTimeout(timeoutId);
        }, [setFieldsValue, fieldNames.phoneNumber]);
        const [dataSourceState, dispatchToDataSource] = useReducer(
          dataSourceReducer,
          initialDataSourceState,
        );
        const [dataSourceLiveState, dispatchToDataSourceLive] = useReducer(
          dataSourceReducer,
          initialDataSourceState,
        );
        const [language, setLanguage] = useState(langMap[lang as langType]);

        if (compareTwoObjects(getFieldsValue(), initialFormDataState)) {
          setFieldsValue(formDataState);
        } else if (!compareTwoObjects(getFieldsValue(), formDataState)) {
          updateFieldsOfFormData(getFieldsValue());
        }

        const onFieldChange = useCallback(
          (id: string, value: string) => {
            addDataToFormData(id, value);
          },
          [addDataToFormData],
        );

        const handleSearch = useCallback(
          (arg: string, id: string) => {
            if (!dataSourceState[id].length) {
              const fetched = fakeBD.customers.map(
                ({ [id]: value }: any) => value && value.toString(),
              );
              dispatchToDataSource(addToDataSource(id, fetched)); // TODO: add types
              dispatchToDataSourceLive(
                addToDataSource(id, fetched.filter((item: string) => item && item.startsWith(arg))),
              );
            } else {
              dispatchToDataSourceLive(
                addToDataSource(
                  id,
                  dataSourceState[id].filter((item: string) => item && item.startsWith(arg)),
                ),
              );
            }
          },
          [getFieldsValue, dataSourceState, dispatchToDataSource, dispatchToDataSourceLive],
        );

        const nextPage = useCallback(() => {
          form.validateFields((err: any) => {
            if (!err) {
              updateFieldsOfFormData(getFieldsValue());
              history.push(`${ROOT_URL}/finish`);
            }
          });
        }, [form, history]);

        const handleClearClick = useCallback(() => {
          setFieldsValue(initialFormDataState);
          clearFields();
        }, [setFieldsValue, clearFields]);

        const handleSubmit = useCallback(
          (e?: React.FormEvent<HTMLFormElement>) => {
            e && e.preventDefault();
            nextPage();
          },
          [nextPage],
        );

        const onSelfPickUpClick = useCallback(() => {
          const {
            city, street, house, postIndex,
          } = shopAddress;
          // updateFieldsOfFormData({
          //   [fieldNames.city]: city,
          //   [fieldNames.street]: street,
          //   [fieldNames.houseNumber]: house.toString(),
          //   [fieldNames.plz]: postIndex,
          // });
          updateFieldsOfFormData(initialFormDataState);
          history.push(`${ROOT_URL}/finish`);
        }, [nextPage, updateFieldsOfFormData, shopAddress]);

        const onInnerClick = useCallback(() => {
          const {
            city, street, house, postIndex,
          } = shopAddress;
          updateFieldsOfFormData({ ...initialFormDataState, isTaxSecondOnAll: true });
          history.push(`${ROOT_URL}/finish`);
        }, [nextPage, updateFieldsOfFormData, shopAddress]);

        const handleKeyDown = useCallback(
          (e: any) => {
            if (e.key === 'Escape') {
              e.stopPropagation();
              e.preventDefault();
              handleClearClick();
            } else if (e.key === 'F2') {
              e.stopPropagation();
              e.preventDefault();
              nextPage();
            } else if (e.key == 'F5') {
              e.stopPropagation();
              e.preventDefault();
              onSelfPickUpClick();
            } else if (e.key === 'F6') {
              e.stopPropagation();
              e.preventDefault();
              onInnerClick();
            }
          },
          [handleClearClick, nextPage],
        );

        const handleEnterDown = useCallback(
          (id: string, value: string) => {
            const customer = tryToFetchUser(id, value);
            if (customer) {
              setFieldsValue(customer);
            }
          },
          [setFieldsValue],
        );

        useEffect(() => {
          setLanguage(langMap[lang as langType]);
        }, [lang]);

        useEffect(() => {
          window.addEventListener('keydown', handleKeyDown);
          return () => window.removeEventListener('keydown', handleKeyDown);
        }, [handleKeyDown]);
        const buttons = useMemo(
          () => [
            { value: Buttons.PHONE_MONITOR, label: `F3 - ${language.phoneMonitor}` },
            { value: Buttons.TABLE_ORDERS, label: `F4 - ${language.tableOrders}` },
            { value: Buttons.SELF_PICK_UP, label: `F5 - ${language.selfPickUp}` },
            { value: Buttons.INNER, label: `F3 - ${language.inner}` },
          ],
          [language],
        );
        const handleNavButtonClick = useCallback(
          (button: Buttons) => {
            switch (button) {
              case Buttons.PHONE_MONITOR: {
                return;
              }
              case Buttons.TABLE_ORDERS: {
                return;
              }
              case Buttons.SELF_PICK_UP: {
                return onSelfPickUpClick();
              }
              case Buttons.INNER: {
                return onInnerClick();
              }
            }
          },
          [onSelfPickUpClick],
        );
        const fvs = getFieldsValue();
        const fieldsValues = Object.keys(fvs).reduce(
          (acc, key) => ({ ...acc, [key]: { name: idToName[key], value: fvs[key] } }),
          {},
        );
        return (
          <div className="DeliveryFormPage">
            <div>
              {/* <Header onHelpClick={console.log} onLogoutClick={} /> */}
              {/* <Header
                style={{
                  background: '#fff',
                  marginTop: '24px',
                  height: 'auto',
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'space-around',
                }}
              >
                <Button type="dashed" size="large">
                  {language.tableOrders}
                  {' '}
/ F4
                </Button>
                <Button type="dashed" size="large" onClick={onSelfPickUpClick}>
                  {language.selfPickUp}
                  {' '}
/ F5
                </Button>
                <Button type="dashed" size="large" onClick={onInnerClick}>
                  {language.inner}
                  {' '}
/ F6
                </Button>
                <Button type="dashed" size="large">
                  {language.phoneMonitor}
                  {' '}
/ F3
                </Button>
              </Header> */}
              {/* <Divider /> */}
              {console.log(getFieldsValue())}
              <div className="DeliveryPage">
                <DeliveryFormNew
                  fieldsValues={fieldsValues}
                  onFieldChange={(key, value) => setFieldsValue({ [key]: value })}
                  onResetClick={handleClearClick}
                  onNextClick={handleSubmit}
                />
                <NavigationButtons buttons={buttons} onButtonClick={handleNavButtonClick} />
              </div>
              <Content style={{ margin: '0 16px', background: 'inherit', display: 'none' }}>
                <div>
                  <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown} {...formItemLayout}>
                    <Card style={{ width: '60%', maxWidth: '500px' }}>
                      <Form.Item label={language.customerNumber}>
                        {getFieldDecorator(fieldNames.customerNumber, {
                          normalize: onlyNumbersNormalize,
                          rules: [{ pattern: /[0-9]+/, message: 'Разрешены только цифры' }],
                        })(
                          <AutoComplete
                            dataSource={dataSourceLiveState[fieldNames.customerNumber]}
                            onSearch={(arg) => handleSearch(arg, fieldNames.customerNumber)}
                            onSelect={(value) => handleEnterDown(fieldNames.customerNumber, value as string)}
                          >
                            <Input
                              autoComplete="off"
                              disabled
                              onKeyDown={handleKeyDown}
                              maxLength={6}
                              id={fieldNames.customerNumber}
                            />
                          </AutoComplete>,
                        )}
                      </Form.Item>
                      <Form.Item label={language.phoneNumber}>
                        {getFieldDecorator(fieldNames.phoneNumber, {
                          normalize: onlyNumbersNormalize,
                          rules: [
                            { required: true, message: 'Введите номер телефона клиента' },
                            { pattern: /[0-9]+/, message: 'Разрешены только цифры' },
                          ],
                        })(
                          <AutoComplete
                            dataSource={dataSourceLiveState[fieldNames.phoneNumber]}
                            onSearch={(arg) => handleSearch(arg, fieldNames.phoneNumber)}
                            onSelect={(value) => handleEnterDown(fieldNames.phoneNumber, value as string)}
                          >
                            <Input
                              autoComplete="off"
                              onKeyDown={handleKeyDown}
                              autoFocus
                              maxLength={15}
                              id={fieldNames.phoneNumber}
                            />
                          </AutoComplete>,
                        )}
                      </Form.Item>
                      <Form.Item label={language.name}>
                        {getFieldDecorator(fieldNames.name, {
                          normalize: startsWithUpperCaseNormalizer,
                          rules: [{ required: true, message: 'Введите имя клиента' }],
                        })(
                          <AutoComplete
                            dataSource={dataSourceLiveState[fieldNames.name]}
                            onSearch={(arg) => handleSearch(arg, fieldNames.name)}
                            onSelect={(value) => handleEnterDown(fieldNames.name, value as string)}
                          >
                            <Input
                              autoComplete="off"
                              onKeyDown={handleKeyDown}
                              maxLength={30}
                              id={fieldNames.name}
                            />
                          </AutoComplete>,
                        )}
                      </Form.Item>
                      <Form.Item label={language.city}>
                        {getFieldDecorator(fieldNames.city, {
                          normalize: startsWithUpperCaseNormalizer,
                          rules: [{ required: true, message: 'Введите название города' }],
                        })(
                          <Input
                            autoComplete="off"
                            onKeyDown={handleKeyDown}
                            maxLength={25}
                            id={fieldNames.city}
                          />,
                        )}
                      </Form.Item>
                      <Form.Item label={language.street}>
                        {getFieldDecorator(fieldNames.street, {
                          normalize: startsWithUpperCaseNormalizer,
                          rules: [{ required: true, message: 'Введите название улицы' }],
                        })(
                          <Input
                            autoComplete="off"
                            onKeyDown={handleKeyDown}
                            maxLength={30}
                            id={fieldNames.street}
                          />,
                        )}
                      </Form.Item>
                      <Form.Item label={language.houseNumber}>
                        {getFieldDecorator(fieldNames.houseNumber, {
                          normalize: startsWithUpperCaseNormalizer,
                          rules: [
                            { required: true, message: 'Введите номер дома' },
                            { pattern: /[0-9]+/, message: 'Разрешены только цифры' },
                          ],
                        })(
                          <Input
                            autoComplete="off"
                            onKeyDown={handleKeyDown}
                            maxLength={6}
                            id={fieldNames.houseNumber}
                          />,
                        )}
                      </Form.Item>
                      <Form.Item label={language.plz}>
                        {getFieldDecorator(fieldNames.plz, {
                          normalize: onlyNumbersNormalize,
                          rules: [
                            { required: true, message: 'Введите почтовый индекс' },
                            { pattern: /[0-9]+/, message: 'Разрешены только цифры' },
                          ],
                        })(
                          <Input
                            autoComplete="off"
                            onKeyDown={handleKeyDown}
                            maxLength={6}
                            id={fieldNames.plz}
                          />,
                        )}
                      </Form.Item>
                      <Form.Item label={language.clientComment}>
                        {getFieldDecorator(fieldNames.clientComment, {
                          normalize: startsWithUpperCaseNormalizer,
                        })(
                          <Input
                            autoComplete="off"
                            onKeyDown={handleKeyDown}
                            maxLength={35}
                            id={fieldNames.clientComment}
                          />,
                        )}
                      </Form.Item>
                      <Form.Item label={language.deliveryCost}>
                        {getFieldDecorator(fieldNames.deliveryCost, { initialValue: '0,00' })(
                          <Select
                            onChange={(value: string) => onFieldChange(fieldNames.deliveryCost, value)}
                            id={fieldNames.deliveryCost}
                          >
                            {selectValues.map((value) => (
                              <Option key={value} value={value}>
                                {value}
                              </Option>
                            ))}
                          </Select>,
                        )}
                      </Form.Item>
                    </Card>
                    <Divider />
                    {/* <div
                      style={{
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Button type="danger" size="large" onClick={handleClearClick}>
                        {language.clear} / ESC
                      </Button>
                      <Form.Item>
                        <Button htmlType="submit" type="primary" size="large">
                          {language.goToOrder} / F2
                        </Button>
                      </Form.Item>
                    </div> */}
                  </Form>
                </div>
              </Content>
            </div>
          </div>
        );
      },
    ),
  ),
);

export default DeliveryForm;
