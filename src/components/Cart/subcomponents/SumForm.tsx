import React, { useCallback, useEffect, useState } from 'react';

import { Input, Form } from 'antd';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './reduxProvider';
import { SumFormProps } from './SumFormTypes';
import { langMap } from '../../../lang';

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

const SumForm = Form.create({ name: 'cart' })(connect(mapStateToProps, mapDispatchToProps)(({ lang, form: { getFieldDecorator, setFieldsValue }, addDataToFormData,
  formDataState: {
    mwst_7,
    mwst_19,
    greichten,
    zutaten,
    deliveryCost,
    discount,
    total_price
  } }: SumFormProps) => {
  const [language, setLanguage] = useState(langMap[lang]);
  const onDeliveryCostChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    addDataToFormData('deliveryCost', event.target.value)
  }, [addDataToFormData]);

  const onDiscountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    addDataToFormData('discount', event.target.value)
  }, [addDataToFormData]);

  useEffect(() => {//синхронизируем redux-store и форму
    setFieldsValue({
      mwst_7,
      mwst_19,
      greichten,
      zutaten,
      deliveryCost,
      discount,
      total_price
    });
  }, [mwst_7, mwst_19, greichten, zutaten, deliveryCost, discount, total_price, setFieldsValue]);

  useEffect(() => {
    setLanguage(langMap[lang]);
  }, [lang]);

  return (
    <Form {...formItemLayout} className="sum-form">
      <div className="cart__sum">
        <div className="sum__item sum__item_flex-start">
          <Form.Item label={language.tax_7}>
            {getFieldDecorator('mwst_7')(
              <Input placeholder={language.tax_7} id="mwst_7" disabled suffix="€" />
            )}
          </Form.Item>
          <Form.Item label={language.tax_19}>
            {getFieldDecorator('mwst_19')(
              <Input placeholder={language.tax_19} id="mwst_19" disabled suffix="€" />
            )}
          </Form.Item>
        </div>
        <div className="sum__item">
          <Form.Item label={language.articlePrices}>
            {getFieldDecorator('greichten')(
              <Input placeholder={language.articlePrices} id="greichten" disabled suffix="€" />
            )}
          </Form.Item>
          <Form.Item label={language.additions}>
            {getFieldDecorator('zutaten')(
              <Input placeholder={language.additions} id="zutaten" disabled suffix="€" />
            )}
          </Form.Item>
          <Form.Item label={language.deliveryCost}>{getFieldDecorator('deliveryCost')(<Input onChange={onDeliveryCostChange} placeholder={language.deliveryCost} suffix="€" />)}</Form.Item>
          <Form.Item label={`F11 / ${language.discount}`}>{getFieldDecorator('discount')(<Input onChange={onDiscountChange} placeholder={`F11 / ${language.discount}`} suffix="%" />)}</Form.Item>
          <Form.Item label={language.totalPrice}>{getFieldDecorator('total_price')(<Input id="total_price" placeholder={language.totalPrice} disabled suffix="€" />)}</Form.Item>
        </div>
      </div>
    </Form>
  )
}));

export default SumForm;
