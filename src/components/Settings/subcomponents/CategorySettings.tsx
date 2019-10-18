import React, { useCallback } from 'react';
import {
  Typography, Form, Input, Select, Upload, Button, Icon, Table,
} from 'antd';

import './CategorySettings.css';

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

const sizesQuantities = [1, 2, 3, 4, 5, 6, 7, 8];

const createRange = (from: number, to: number) => {
  const arr = [];
  for (let i = from; i <= to; i += 1) {
    arr.push(i);
  }
  return arr;
};

const CategorySettings = Form.create({ name: 'categorySettings' })(
  ({ form: { getFieldDecorator, getFieldValue, setFieldsValue } }: any) => {
    const onUploadHandle = useCallback(() => {}, []);

    const addSubcategoryField = useCallback(() => {
      const subcategoryFields = getFieldValue('subcategoryFields');
      setFieldsValue({
        subcategoryFields: [...subcategoryFields, subcategoryFields.length],
      });
    }, [setFieldsValue, getFieldValue]);

    const removeSubcategoryField = useCallback(
      (key: number) => () => {
        const subcategoryFields = getFieldValue('subcategoryFields');
        const keyIdx = subcategoryFields.indexOf(key);
        if (keyIdx !== -1) {
          setFieldsValue({
            subcategoryFields: [
              ...subcategoryFields.slice(0, keyIdx),
              ...subcategoryFields.slice(keyIdx + 1),
            ],
          });
        }
      },
      [getFieldValue, setFieldsValue],
    );

    const onQuantityOfSizesChange = useCallback(
      (value: any) => {
        if (Number.isNaN(Number(value))) {
          return;
        }
        setFieldsValue({
          sizesFields: createRange(1, Number(value)),
        });
      },
      [setFieldsValue],
    );

    getFieldDecorator('subcategoryFields', { initialValue: [] });
    const subcategoryFields = getFieldValue('subcategoryFields');
    const subcategoryFieldformItems = subcategoryFields.map((k: any) => (
      <Form.Item label="subcategory" required={false} key={k}>
        {getFieldDecorator(`subcategoryFieldsFormItems[${k}]`)(
          <Input suffix={<Icon type="close" onClick={removeSubcategoryField(k)} />} />,
        )}
      </Form.Item>
    ));
    getFieldDecorator('sizesFields', { initialValue: [1] });
    const sizesFields = getFieldValue('sizesFields');
    const sizesFieldsFormItems = sizesFields.map((k: any) => (
      <Form.Item label={`size name ${k}`}>
        {getFieldDecorator(`sizesFieldsFormItems[${k}]`)(<Input />)}
      </Form.Item>
    ));
    return (
      <div className="CategorySettingsPage">
        <Typography.Title level={2}>Add category from menu</Typography.Title>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form {...formItemLayout} className="CategorySettings">
          <div className="CategorySettings-LeftForm">
            <Form.Item label="category name">
              {getFieldDecorator('name')(
                <Select>
                  <Select.Option key="test">TEST</Select.Option>
                </Select>,
              )}
            </Form.Item>
            {subcategoryFieldformItems}
            <Form.Item>
              <Button type="dashed" onClick={addSubcategoryField}>
                <Icon type="plus" />
                {' '}
Add subcategory
              </Button>
            </Form.Item>
            <Form.Item label="printer">
              {getFieldDecorator('printer')(
                <Select>
                  <Select.Option key="test">TEST</Select.Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="program icon">
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: onUploadHandle,
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" />
                    {' '}
Click to upload
                  </Button>
                </Upload>,
              )}
            </Form.Item>
            <Form.Item label="online shop icon">
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: onUploadHandle,
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" />
                    {' '}
Click to upload
                  </Button>
                </Upload>,
              )}
            </Form.Item>
          </div>
          <div className="CategorySettings-RightForm">
            <Form.Item label="sizes">
              <Select onSelect={onQuantityOfSizesChange}>
                {sizesQuantities.map((sizes) => (
                  <Select.Option key={sizes}>{sizes}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            {sizesFieldsFormItems}
          </div>
        </Form>
        <div className="CategorySettingsPage-Buttons">
          <Button type="danger" size="large">
            ESC / BACK
          </Button>
          <Button size="large">F2 / Save</Button>
        </div>
        <div>
          <Table />
        </div>
      </div>
    );
  },
);

export default CategorySettings;
