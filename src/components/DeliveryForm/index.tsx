import React, { useReducer, useEffect, useCallback, useState } from 'react';
import { Button, Form, Input, AutoComplete, Select, Divider, Card, Layout } from 'antd';

import { withRouter } from 'react-router-dom';
import { connect, MapDispatchToPropsNonObject, MapStateToPropsParam } from 'react-redux';

//types
import { DeliveryFormProps } from './DeliveryFormTypes';
import { langType } from '../../lang';

import fakeBD from '../../fakeBD';
import { langMap } from '../../lang';

import fieldNames from '../../constants/fieldNames';
import { selectValues } from '../../constants/selectValues';

import { initialFormDataState } from '../../redux/reducers';
import { addToFormData, updateAllFieldsOfFormData, clearAllFields } from '../../redux/actions';
import { Action } from 'redux';

import { ROOT_URL } from '../../constants/rootUrl';

const { Header, Content } = Layout;

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
    xl: { span: 12 }
  },
};

const dataSourceActions = {
  ADD_TO_DATA_SOURCE: 'ADD_TO_DATA_SOURCE'
};

type dataSourceReducerTypes = typeof dataSourceActions.ADD_TO_DATA_SOURCE;
interface dataSourceReducerAction extends Action<dataSourceReducerTypes> {
  dataSourceName: string;
  dataSourceData: string[];
};

function dataSourceReducer(state: any, action: dataSourceReducerAction) {//FIXME
  switch (action.type) {
    case dataSourceActions.ADD_TO_DATA_SOURCE: {
      return {
        ...state,
        [action.dataSourceName]: action.dataSourceData
      }
    }
  }
};


const addToDataSource = (dataSourceName: string, dataSourceData: string[]) => ({ type: dataSourceActions.ADD_TO_DATA_SOURCE, dataSourceName, dataSourceData });



const initialDataSourceState: any = {//TODO: add types
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
  [fieldNames.deliveryCost]: []
};

const tryToFetchUser = (fieldId: string, fieldValue: string) => fakeBD.customers.find((customer: any) =>  customer[fieldId] && customer[fieldId].toString() === fieldValue);

const compareTwoObjects = (object1: any, object2: any) => {
  if (Object.keys(object1).length !== Object.keys(object2).length)
    return false;
  for (let [key, value] of Object.entries(object1)) {
    if (object2[key] !== value)
      return false;
  };
  return true;
}


const mapDispatchToProps: MapDispatchToPropsNonObject<any, any> = (dispatch) => ({
  addDataToFormData(id: string, value: string) {
    dispatch(addToFormData(id, value))
  },
  updateFieldsOfFormData(newState: any) {
    dispatch(updateAllFieldsOfFormData(newState));
  },
  clearFields() {
    dispatch(clearAllFields());
  }
});

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state) => ({ formDataState: state.formDataState, lang: state.languages.lang, shopAddress: state.settings.shopAddress });

const DeliveryForm = Form.create<DeliveryFormProps>(
  { name: 'delivery_form' }
)(connect(mapStateToProps, mapDispatchToProps)(withRouter((
  { lang, formDataState, addDataToFormData, clearFields, updateFieldsOfFormData, form: { getFieldDecorator, setFieldsValue, getFieldsValue }, form, history, shopAddress }: any) => {

  const [dataSourceState, dispatchToDataSource] = useReducer(dataSourceReducer, initialDataSourceState);
  const [dataSourceLiveState, dispatchToDataSourceLive] = useReducer(dataSourceReducer, initialDataSourceState);
  const [language, setLanguage] = useState(langMap[lang as langType]);

  const onFieldChange = useCallback((id: string, value: string) => {
    addDataToFormData(id, value);
  }, [addDataToFormData]);

  const handleSearch = useCallback((arg: string, id: string) => {
    updateFieldsOfFormData(getFieldsValue());
    if (!dataSourceState[id].length) {
      const fetched = fakeBD.customers.map(({ [id]: value }: any) => value && value.toString());
      dispatchToDataSource(addToDataSource(id, fetched));//TODO: add types
      dispatchToDataSourceLive(addToDataSource(id, fetched.filter((item: string) => item && item.startsWith(arg))));
    } else {
      dispatchToDataSourceLive(addToDataSource(id, dataSourceState[id].filter((item: string) => item && item.startsWith(arg))));
    }
  }, [updateFieldsOfFormData, getFieldsValue, dataSourceState, dispatchToDataSource, dispatchToDataSourceLive]);

  const nextPage = useCallback(() => {
    form.validateFields((err: any) => {
      if (!err) {
        history.push(`${ROOT_URL}/finish`);
      }
    });
  }, [form, history]);

  const handleClearClick = useCallback(() => {
    setFieldsValue(initialFormDataState);
    clearFields();
  }, [setFieldsValue, clearFields]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextPage();
  }, [nextPage]);

  const onSelfPickUpClick = useCallback(() => {
    const { city, street, house, postIndex } = shopAddress;
    updateFieldsOfFormData({
      [fieldNames.city]: city,
      [fieldNames.street]: street,
      [fieldNames.houseNumber]: house,
      [fieldNames.plz]: postIndex,
    });
    nextPage();
  }, [nextPage, updateFieldsOfFormData, shopAddress]);

  const onInnerClick = useCallback(() => {
    const { city, street, house, postIndex } = shopAddress;
    updateFieldsOfFormData({
      [fieldNames.city]: city,
      [fieldNames.street]: street,
      [fieldNames.houseNumber]: house,
      [fieldNames.plz]: postIndex,
      isTaxSecondOnAll: true,
    });
    nextPage();
  }, [nextPage, updateFieldsOfFormData, shopAddress]);

  const handleEscDown = useCallback((e: any) => {
    if (e.key === 'Escape') {
      handleClearClick();
    } else if (e.key === 'F2') {
      nextPage();
    } else if (e.key == 'F5') {
      onSelfPickUpClick();
    } else if (e.key === 'F6') {
      onInnerClick();
    }
  }, [handleClearClick, nextPage]);

  const handleEnterDown = useCallback((id: string, value: string) => {
    const customer = tryToFetchUser(id, value);
    if (customer) {
      setFieldsValue(customer);
      updateFieldsOfFormData(customer);
    }
  }, [setFieldsValue, updateFieldsOfFormData]);

  useEffect(() => {
    setLanguage(langMap[lang as langType]);
  }, [lang]);

  useEffect(() => {
    window.addEventListener('keydown', handleEscDown);
    return () => window.removeEventListener('keydown', handleEscDown);
  }, [handleEscDown]);

  useEffect(() => {
    if (compareTwoObjects(getFieldsValue(), formDataState))
      return;
    setFieldsValue(formDataState);
  }, [formDataState, setFieldsValue, getFieldsValue]);

  console.log('shopAddress', shopAddress);
  return (
    <Layout>
      <Header style={{ background: '#fff', marginTop: '24px', height: 'auto', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around' }}>
        <Button type="dashed" size="large">{language.tableOrders} / F4</Button>
        <Button type="dashed" size="large" onClick={onSelfPickUpClick}>{language.selfPickUp} / F5</Button>
        <Button type="dashed" size="large" onClick={onInnerClick}>{language.inner} / F6</Button>
        <Button type="dashed" size="large">{language.phoneMonitor} / F3</Button>
      </Header>
      <Divider />
      <Content style={{ margin: '0 16px', background: 'inherit' }}>
        <div>
          <Form onSubmit={handleSubmit} onKeyDown={handleEscDown}  {...formItemLayout}>
            <Card style={{ width: '60%', maxWidth: '500px' }}>
              <Form.Item label={language.customerNumber}>
                {getFieldDecorator(fieldNames.customerNumber, {
                  rules: [
                    { required: true, message: 'Введите номер клиента' },
                    { pattern: /[0-9]+/, message: 'Разрешены только цифры' }
                  ]
                })(
                  <AutoComplete
                    dataSource={dataSourceLiveState[fieldNames.customerNumber]}
                    onSearch={(arg) => handleSearch(arg, fieldNames.customerNumber)}
                    onSelect={(value) => handleEnterDown(fieldNames.customerNumber, value as string)}
                  >
                    <Input onKeyDown={handleEscDown} maxLength={6} id={fieldNames.customerNumber} />
                  </AutoComplete>)}
              </Form.Item>
              <Form.Item label={language.phoneNumber}>
                {getFieldDecorator(fieldNames.phoneNumber, {
                  rules: [
                    { required: true, message: 'Введите номер телефона клиента' },
                    { pattern: /[0-9]+/, message: 'Разрешены только цифры' }
                  ]
                })(
                  <AutoComplete
                    dataSource={dataSourceLiveState[fieldNames.phoneNumber]}
                    onSearch={(arg) => handleSearch(arg, fieldNames.phoneNumber)}
                    onSelect={(value) => handleEnterDown(fieldNames.phoneNumber, value as string)}
                  >
                    <Input onKeyDown={handleEscDown} autoFocus={true} maxLength={15} id={fieldNames.phoneNumber} />
                  </AutoComplete>)}
              </Form.Item>
              <Form.Item label={language.name}>
                {getFieldDecorator(fieldNames.name, {
                  rules: [
                    { required: true, message: 'Введите имя клиента' }
                  ]
                })(
                  <AutoComplete
                    dataSource={dataSourceLiveState[fieldNames.name]}
                    onSearch={(arg) => handleSearch(arg, fieldNames.name)}
                    onSelect={(value) => handleEnterDown(fieldNames.name, value as string)}
                  >
                    <Input onKeyDown={handleEscDown} maxLength={30} id={fieldNames.name} />
                  </AutoComplete>)}
              </Form.Item>
              <Form.Item label={language.city}>
                {getFieldDecorator(fieldNames.city, {
                  rules: [
                    { required: true, message: 'Введите название города' }
                  ]
                })(<Input onKeyDown={handleEscDown} maxLength={25} id={fieldNames.city} />)}
              </Form.Item>
              <Form.Item label={language.street}>
                {getFieldDecorator(fieldNames.street, {
                  rules: [
                    { required: true, message: 'Введите название улицы' }
                  ]
                })(<Input onKeyDown={handleEscDown} maxLength={30} id={fieldNames.street} />)}
              </Form.Item>
              <Form.Item label={language.houseNumber}>
                {getFieldDecorator(fieldNames.houseNumber, {
                  rules: [
                    { required: true, message: 'Введите номер дома' },
                    { pattern: /[0-9]+/, message: 'Разрешены только цифры' }
                  ]
                })(<Input onKeyDown={handleEscDown} maxLength={6} id={fieldNames.houseNumber} />)}
              </Form.Item>
              <Form.Item label={language.plz}>
                {getFieldDecorator(fieldNames.plz, {
                  rules: [
                    { required: true, message: 'Введите почтовый индекс' },
                    { pattern: /[0-9]+/, message: 'Разрешены только цифры' }
                  ]
                })(<Input onKeyDown={handleEscDown} maxLength={6} id={fieldNames.plz} />)}
              </Form.Item>
              <Form.Item label={language.clientComment}>
                {getFieldDecorator(fieldNames.clientComment)(
                  <Input onKeyDown={handleEscDown} maxLength={35} id={fieldNames.clientComment} />)}
              </Form.Item>
              <Form.Item label={language.deliveryCost}>
                {getFieldDecorator(fieldNames.deliveryCost)(
                  <Select onChange={(value: string) => onFieldChange(fieldNames.deliveryCost, value)} id={fieldNames.deliveryCost}>
                    {selectValues.map(value => <Option key={value} value={value}>{value}</Option>)}
                  </Select>)}
              </Form.Item>
            </Card>
            <Divider />
            <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
              <Button type="danger" size="large" onClick={handleClearClick}>{language.clear} / ESC</Button>
              <Form.Item>
                <Button htmlType="submit" type="primary" size="large">{language.goToOrder} / F2</Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Content>
    </Layout >
  )
})));

export default DeliveryForm;
