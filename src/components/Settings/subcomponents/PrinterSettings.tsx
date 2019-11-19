import React, {
  useCallback, useMemo, useState, useEffect,
} from 'react';
import {
  Typography,
  Form,
  Input,
  Select,
  Upload,
  Button,
  Icon,
  Table,
  Modal,
  InputNumber,
} from 'antd';

import './CategorySettings.css';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  addCategory, deleteCategory, addPrinter, deletePrinter,
} from '../../../redux/actions';
import { categoriesState, Printer } from '../../../redux/reducers';
import { State } from '../../../redux/types';
import useLanguage from '../../../helpers/useLanguage';
import { ROOT_URL } from '../../../constants/rootUrl';

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

const types = ['type1', 'type2', 'type3', 'type4', 'type5', 'type6', 'type7', 'type8'];

const createRange = (from: number, to: number) => {
  const arr = [];
  for (let i = from; i <= to; i += 1) {
    arr.push(i);
  }
  return arr;
};

interface PrinterSettingsOwnProps {}
interface PrinterSettingsStateProps {
  printers: Printer[]
}
const mapStateToProps: MapStateToProps<
  PrinterSettingsStateProps,
  PrinterSettingsOwnProps,
  State
> = (state) => ({
  printers: state.printers,
});

interface PrinterSettingsDispatchProps {
  addPrinter: typeof addPrinter
  deletePrinter: typeof deletePrinter
}
const mapDispatchToProps = {
  addPrinter,
  deletePrinter,
};

const cats = ['Pizza', 'Salat', 'Pasta', 'Fast Food', 'Getränk'];

const printersList = ['Standard Drucker', 'Printer1', 'Printer2', 'Printer3'];

const PrinterSettings = Form.create({ name: 'printerSettings' })(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    withRouter(
      ({
        form: {
          getFieldDecorator, getFieldValue, setFieldsValue, getFieldsValue, validateFields,
        },
        addPrinter,
        printers,
        deletePrinter,
        history,
      }: any) => {
        const [
          printerName,
          description,
          type,
          quantityOfCopies,
          pleaseTypeNameOfYourPrinter,
          frontOrBackPrinter,
          back,
          save,
          doYouWantToSaveChanges,
          dontSave,
          printerAlreadyExistsDoYouWantToRewriteIt,
          rewrite,
          cancel,
        ] = useLanguage(
          'printerName',
          'description',
          'type',
          'quantityOfCopies',
          'pleaseTypeNameOfYourPrinter',
          'frontOrBackPrinter',
          'back',
          'save',
          'doYouWantToSaveChanges',
          'dontSave',
          'printerAlreadyExistsDoYouWantToRewriteIt',
          'rewrite',
          'cancel',
        );
        const [isModalVisible, setModalVisible] = useState(false);
        const initialForm = useMemo(
          () => ({
            printerName: printersList[0],
            description: '',
            type: types[0],
            quantityOfCopies: 1,
          }),
          [],
        );
        useEffect(() => {
          (window as any).PPC = (window as any).PPC || {};
          const {
            printerName, description, type, quantityOfCopies,
          } = getFieldsValue();
          if (
            printerName === initialForm.printerName
            && description === initialForm.description
            && type === initialForm.type
            && quantityOfCopies === initialForm.quantityOfCopies
          ) {
            (window as any).PPC.onClick = null;
          } else {
            (window as any).PPC.onClick = handleOutClick;
          }
        });
        const onKeyDown = useCallback(
          (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
              const {
                printerName, description, type, quantityOfCopies,
              } = getFieldsValue();
              if (
                printerName === initialForm.printerName
                && description === initialForm.description
                && type === initialForm.type
                && quantityOfCopies === initialForm.quantityOfCopies
              ) {
                history.push(`${ROOT_URL}/settings/`);
              }
              handleOutClick(event);
            } else if (event.key === 'F7') {
              handleSubmit(event);
            }
          },
          [getFieldsValue, history],
        );

        useEffect(() => {
          window.addEventListener('keydown', onKeyDown);
          return () => {
            window.removeEventListener('keydown', onKeyDown);
          };
        }, [onKeyDown]);

        const resetForm = useCallback(() => {
          setFieldsValue(initialForm);
        }, [setFieldsValue]);

        const handleEditClick = useCallback(
          (nameEdit: string) => {
            const printer = printers.find(({ printerName }: any) => printerName === nameEdit);
            const {
              printerName, type, description, quantityOfCopies,
            } = printer;
            setFieldsValue({
              printerName,
              type,
              description,
              quantityOfCopies,
            });
          },
          [setFieldsValue, printers],
        );
        const columns = [
          { title: printerName, dataIndex: 'printerName', key: 'printerName' },
          { title: description, dataIndex: 'description', key: 'description' },
          { title: type, dataIndex: 'type', key: 'type' },
          { title: quantityOfCopies, dataIndex: 'quantityOfCopies', key: 'quantityOfCopies' },
          {
            title: '',
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
          () => printers.map(
            ({
              printerName, description, type, quantityOfCopies,
            }: Printer, idx: number) => ({
              key: idx.toString(),
              printerName,
              description,
              type,
              quantityOfCopies: `${quantityOfCopies} Exemplar`,
              action: printerName,
            }),
          ),
          [printers],
        );

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
              | React.MouseEvent<HTMLElement, MouseEvent>
              | KeyboardEvent,
          ) => {
            e.preventDefault();
            validateFields((err: any) => {
              if (!err) {
                const {
                  printerName, description, type, quantityOfCopies,
                } = getFieldsValue();
                const printerIdx = printers.findIndex(
                  ({ printerName: pName }: Printer) => pName === printerName,
                );
                if (printerIdx === -1) {
                  addPrinter({
                    printerName,
                    description,
                    type,
                    quantityOfCopies,
                  });
                  resetForm();
                } else {
                  setModalVisible(true);
                  setOpenModal({
                    title: printerAlreadyExistsDoYouWantToRewriteIt,
                    leftText: rewrite,
                    rightText: cancel,
                    onSave: () => {
                      addPrinter({
                        printerName,
                        description,
                        type,
                        quantityOfCopies,
                      });
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
          [validateFields, printers],
        );

        const handleOutClick = useCallback(
          (
            e:
              | React.FormEvent<HTMLFormElement>
              | React.MouseEvent<HTMLDivElement, MouseEvent>
              | React.MouseEvent<HTMLElement, MouseEvent>
              | KeyboardEvent,
          ) => {
            e && e.preventDefault && e.preventDefault();
            validateFields((err: any) => {
              if (!err) {
                const {
                  printerName, description, type, quantityOfCopies,
                } = getFieldsValue();
                if (
                  printerName === initialForm.printerName
                  && description === initialForm.description
                  && type === initialForm.type
                  && quantityOfCopies === initialForm.quantityOfCopies
                ) {
                  return;
                }
                setModalVisible(true);
                setOpenModal({
                  title: doYouWantToSaveChanges,
                  leftText: save,
                  rightText: dontSave,
                  onSave: () => {
                    const printerIdx = printers.findIndex(
                      ({ printerName: pName }: any) => pName === printerName,
                    );
                    if (printerIdx === -1) {
                      addPrinter({
                        printerName,
                        description,
                        type,
                        quantityOfCopies,
                      });
                      resetForm();
                      setModalVisible(false);
                    } else {
                      setOpenModal({
                        title: printerAlreadyExistsDoYouWantToRewriteIt,
                        leftText: rewrite,
                        rightText: cancel,
                        onSave: () => {
                          addPrinter({
                            printerName,
                            description,
                            type,
                            quantityOfCopies,
                          });
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
        const handleBackClick = useCallback(
          (event) => {
            const {
              printerName, description, type, quantityOfCopies,
            } = getFieldsValue();
            if (
              printerName === initialForm.printerName
              && description === initialForm.description
              && type === initialForm.type
              && quantityOfCopies === initialForm.quantityOfCopies
            ) {
              history.push(`${ROOT_URL}/settings/`);
            } else {
              handleOutClick(event);
            }
          },
          [handleOutClick, getFieldsValue, history],
        );
        return (
          <div className="CategorySettingsPage">
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
            <Typography.Title level={2}>{pleaseTypeNameOfYourPrinter}</Typography.Title>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Form {...formItemLayout} onSubmit={handleSubmit}>
              <div style={{ width: '60%' }}>
                <div>
                  <Form.Item label={printerName}>
                    {getFieldDecorator('printerName', {
                      initialValue: printersList[0],
                      rules: [{ required: true, message: "can't be empty" }],
                    })(
                      <Select>
                        {printersList.map((name) => (
                          <Select.Option key={name}>{name}</Select.Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>

                  <Form.Item label={description}>
                    {getFieldDecorator('description', {
                      initialValue: '',
                      rules: [{ required: true, message: "can't be empty" }],
                    })(<Input />)}
                  </Form.Item>
                  {frontOrBackPrinter}
                  <Form.Item label={type}>
                    {getFieldDecorator('type', {
                      initialValue: types[0],
                      rules: [{ required: true, message: "can't be empty" }],
                    })(
                      <Select>
                        {types.map((type) => (
                          <Select.Option key={type}>{type}</Select.Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  {/* <Form.Item>
                </Form.Item> */}
                  <Form.Item label={quantityOfCopies}>
                    {getFieldDecorator('quantityOfCopies', {
                      initialValue: 1,
                      rules: [{ required: true, message: "can't be empty" }],
                    })(<InputNumber min={1} />)}
                  </Form.Item>
                </div>
              </div>
              <div className="CategorySettingsPage-Buttons">
                <Button type="danger" size="large" onClick={handleBackClick}>
                  ESC /
                  {' '}
                  {back}
                </Button>
                <Form.Item>
                  <Button
                    size="large"
                    htmlType="submit"
                    style={{ background: 'green', color: 'white' }}
                  >
                    F7 /
                    {' '}
                    {save}
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
  ),
);

export default PrinterSettings;
