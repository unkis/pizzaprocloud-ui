import React, { useCallback, useMemo, useState } from 'react';
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
      const [selectVal, setSelectVal] = useState(sizesQuantities[0]);
      const [isModalVisible, setModalVisible] = useState(false);
      const onUploadHandle = useCallback(() => {}, []);
      const initialForm = {
        name: cats[0],
        printer: printers[0],
        sizesFields: [0],
        sizesFieldsFormItems: [''],
        subcategoryFields: [],
      };
      const resetForm = useCallback(() => {
        setFieldsValue(initialForm);
        setSelectVal(1);
      }, [setFieldsValue]);

      const handleEditClick = useCallback(
        (nameEdit: string) => {
          const category = categories.find(
            ({ name: categoryName }: any) => categoryName === nameEdit,
          );
          const {
            name, subcategories, printer, sizes,
          } = category;
          console.log('>>> sizes:', sizes);
          setSelectVal(sizes.length);
          setTimeout(() => {
            setFieldsValue({
              sizesFields: createRange(0, sizes.length - 1),
            });
            setFieldsValue({
              name,
              printer,
              sizesFieldsFormItems: sizes.map(({ num, name }: any) => name || ''),
              subcategoryFields: subcategories,
            });
          }, 100);
          console.log('>> cat: ', category);
        },
        [setFieldsValue, setSelectVal, categories],
      );
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
              <Icon
                type="edit"
                onClick={() => handleEditClick(name)}
                style={{ width: '20px', height: '20px' }}
              />
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
          console.log('>>> ITS ME');
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
          {getFieldDecorator(`sizesFieldsFormItems[${k}]`, { initialValue: '' })(<Input />)}
        </Form.Item>
      ));
      const [openModal, setOpenModal] = useState({
        onSave: () => {},
        onCancel: () => {},
        title: '',
        leftText: '',
        rightText: '',
      });
      const handleSubmit = useCallback(
        (
          e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLDivElement, MouseEvent>
            | React.MouseEvent<HTMLElement, MouseEvent>,
        ) => {
          e.preventDefault();
          validateFields((err: any) => {
            if (!err) {
              const {
                name, printer, sizesFieldsFormItems, subcategoryFields,
              } = getFieldsValue();
              const catIdx = categories.findIndex(({ name: catName }: any) => catName === name);
              if (catIdx === -1) {
                addCategory(
                  name,
                  subcategoryFields,
                  printer,
                  sizesFieldsFormItems.map((name: string, idx: number) => ({ num: idx + 1, name })),
                );
                resetForm();
              } else {
                setModalVisible(true);
                setOpenModal({
                  title: 'Category already exists. Do you want to rewrite it?',
                  leftText: 'Rewrite',
                  rightText: 'Cancel',
                  onSave: () => {
                    addCategory(
                      name,
                      subcategoryFields,
                      printer,
                      sizesFieldsFormItems.map((name: string, idx: number) => ({
                        num: idx + 1,
                        name,
                      })),
                    );
                    resetForm();
                    setModalVisible(false);
                  },
                  onCancel: () => {
                    resetForm();
                    setModalVisible(false);
                  },
                });
              }
            }
          });
        },
        [validateFields],
      );

      const handleOutClick = useCallback(
        (
          e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLDivElement, MouseEvent>
            | React.MouseEvent<HTMLElement, MouseEvent>,
        ) => {
          e.preventDefault();
          validateFields((err: any) => {
            if (!err) {
              const {
                name, printer, sizesFieldsFormItems, subcategoryFields,
              } = getFieldsValue();
              if (
                name === initialForm.name
                && printer === initialForm.printer
                && sizesFieldsFormItems.length === initialForm.sizesFieldsFormItems.length
                && sizesFieldsFormItems[0] === initialForm.sizesFieldsFormItems[0]
                && subcategoryFields.length === initialForm.subcategoryFields.length
              ) {
                return;
              }
              setModalVisible(true);
              setOpenModal({
                title: 'You have unsaved changes. Do you want to save it?',
                leftText: 'Save',
                rightText: "Don't save",
                onSave: () => {
                  const catIdx = categories.findIndex(({ name: catName }: any) => catName === name);
                  if (catIdx === -1) {
                    addCategory(
                      name,
                      subcategoryFields,
                      printer,
                      sizesFieldsFormItems.map((name: string, idx: number) => ({
                        num: idx + 1,
                        name,
                      })),
                    );
                    resetForm();
                    setModalVisible(false);
                  } else {
                    setOpenModal({
                      title: 'Category already exists. Do you want to rewrite it?',
                      leftText: 'Rewrite',
                      rightText: 'Cancel',
                      onSave: () => {
                        addCategory(
                          name,
                          subcategoryFields,
                          printer,
                          sizesFieldsFormItems.map((name: string, idx: number) => ({
                            num: idx + 1,
                            name,
                          })),
                        );
                        resetForm();
                        setModalVisible(false);
                      },
                      onCancel: () => {
                        resetForm();
                        setModalVisible(false);
                      },
                    });
                  }
                },
                onCancel: () => {
                  resetForm();
                  setModalVisible(false);
                },
              });
            }
          });
        },
        [validateFields],
      );
      return (
        <div className="CategorySettingsPage" onMouseLeave={handleOutClick}>
          <Modal
            title={openModal.title}
            footer={null}
            visible={isModalVisible}
            className="CategorySettingsPage-Confirm"
            onCancel={() => setModalVisible(false)}
          >
            <div className="Modal-Buttons">
              <Button onClick={openModal.onSave} size="large">
                {openModal.leftText}
              </Button>
              <Button onClick={openModal.onCancel} size="large">
                {openModal.rightText}
              </Button>
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
                    rules: [{ required: true, message: "can't be empty" }],
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
                    rules: [{ required: true, message: "can't be empty" }],
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
                  <Select
                    value={selectVal}
                    onChange={(num: any) => setSelectVal(num)}
                    onSelect={onQuantityOfSizesChange}
                  >
                    {sizesQuantities.map((sizes) => (
                      <Select.Option key={sizes}>{sizes}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                {sizesFieldsFormItems}
              </div>
            </div>
            <div className="CategorySettingsPage-Buttons">
              <Button type="danger" size="large" onClick={handleOutClick}>
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
