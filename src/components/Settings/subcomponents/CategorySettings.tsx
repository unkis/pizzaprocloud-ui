import React, { useCallback, useMemo } from 'react';
import {
  Typography, Form, Input, Select, Upload, Button, Icon, Table, Modal,
} from 'antd';

import './CategorySettings.css';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { addCategory, deleteCategory } from '../../../redux/actions';
import { categoriesState } from '../../../redux/reducers';
import { State } from '../../../redux/types';

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

interface CategorySettingsOwnProps {}
interface CategorySettingsStateProps {
  categories: categoriesState
}
const mapStateToProps: MapStateToProps<
  CategorySettingsStateProps,
  CategorySettingsOwnProps,
  State
> = (state) => ({
  categories: state.categories,
});

interface CategorySettingsDispatchProps {
  addCategory: (
    name: string,
    subcategories: string[],
    printer: string,
    sizes: ({ num: number; name: string })[],
  ) => void
}
const mapDispatchToProps: MapDispatchToPropsFunction<
  CategorySettingsDispatchProps,
  CategorySettingsOwnProps
> = (dispatch) => ({
  addCategory(
    name: string,
    subcategories: string[],
    printer: string,
    sizes: ({ num: number; name: string })[],
  ) {
    dispatch(addCategory(name, subcategories, printer, sizes));
  },
  deleteCategory(name: string) {
    dispatch(deleteCategory(name));
  },
});

const cats = ['Pizza', 'Salat', 'Pasta', 'Fast Food', 'Getränk'];

const printers = ['Standard Drucker'];

const CategorySettings = Form.create({ name: 'categorySettings' })(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    ({
      form: {
        getFieldDecorator, getFieldValue, setFieldsValue, getFieldsValue, validateFields,
      },
      addCategory,
      categories,
      deleteCategory,
    }: any) => {
      const onUploadHandle = useCallback(() => {}, []);
      const columns = [
        { title: 'categoryName', dataIndex: 'categoryName', key: 'categoryName' },
        { title: 'quantityOfSizes', dataIndex: 'quantityOfSizes', key: 'quantityOfSizes' },
        { title: 'namesOfSizes', dataIndex: 'namesOfSizes', key: 'namesOfSizes' },
        {
          title: 'Actions',
          dataIndex: 'action',
          key: 'action',
          render: (name: string) => (
            <div className="CategorySettings-ActionsIcons">
              <Icon type="edit" style={{ width: '20px', height: '20px' }} />
              <Icon type="delete" onClick={() => deleteCategory(name)} />
            </div>
          ),
        },
      ];
      const dataSource = useMemo(
        () => categories.map(({ name, sizes }: any, idx: any) => ({
          key: idx.toString(),
          categoryName: name,
          quantityOfSizes: sizes.length,
          namesOfSizes: sizes.reduce(
            (str: any, elem: any) => `${str} ${elem.num}-${elem.name}`,
            '',
          ),
          action: name,
        })),
        [categories],
      );
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
            sizesFields: createRange(0, Number(value) - 1),
            sizesFieldsFormItems: getFieldValue('sizesFieldsFormItems').slice(0, Number(value) - 1),
          });
        },
        [setFieldsValue, getFieldValue],
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
      getFieldDecorator('sizesFields', { initialValue: [0] });
      const sizesFields = getFieldValue('sizesFields');
      const sizesFieldsFormItems = sizesFields.map((k: any) => (
        <Form.Item label={`size name ${k + 1}`}>
          {getFieldDecorator(`sizesFieldsFormItems[${k}]`, { rules: [{ required: true }] })(
            <Input />,
          )}
        </Form.Item>
      ));
      const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          validateFields((err: any) => {
            if (!err) {
              const {
                name, printer, sizesFieldsFormItems, subcategoryFields,
              } = getFieldsValue();
              addCategory(
                name,
                subcategoryFields,
                printer,
                sizesFieldsFormItems.map((name: string, idx: number) => ({ num: idx + 1, name })),
              );
            }
          });
        },
        [validateFields],
      );
      return (
        <div className="CategorySettingsPage">
          <Modal
            title="Do you want to save changes"
            footer={null}
            visible={false}
            className="CategorySettingsPage-Confirm"
          >
            <div className="Modal-Buttons">
              <Button size="large">Save</Button>
              <Button size="large">Do not save</Button>
            </div>
          </Modal>
          <Typography.Title level={2}>Add category from menu</Typography.Title>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <div className="CategorySettings">
              <div className="CategorySettings-LeftForm">
                <Form.Item label="category name">
                  {getFieldDecorator('name', {
                    initialValue: cats[0],
                    rules: [{ required: true }],
                  })(
                    <Select>
                      {cats.map((name) => (
                        <Select.Option key={name}>{name}</Select.Option>
                      ))}
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
                  {getFieldDecorator('printer', {
                    initialValue: printers[0],
                    rules: [{ required: true }],
                  })(
                    <Select>
                      {printers.map((name) => (
                        <Select.Option key={name}>{name}</Select.Option>
                      ))}
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
                  <Select defaultValue={sizesQuantities[0]} onSelect={onQuantityOfSizesChange}>
                    {sizesQuantities.map((sizes) => (
                      <Select.Option key={sizes}>{sizes}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                {sizesFieldsFormItems}
              </div>
            </div>
            <div className="CategorySettingsPage-Buttons">
              <Button type="danger" size="large">
                ESC / BACK
              </Button>
              <Form.Item>
                <Button size="large" htmlType="submit">
                  F2 / Save
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div>
            <Table columns={columns} dataSource={dataSource} bordered />
          </div>
        </div>
      );
    },
  ),
);

export default CategorySettings;
