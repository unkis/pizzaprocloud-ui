import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';

import './ArticleSettings.css';

import {
  Typography,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Table,
  Icon,
  Checkbox,
  Modal,
} from 'antd';
import { FormProps } from 'antd/lib/form';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { WrappedFormInternalProps } from 'antd/lib/form/Form';
import useLanguage from '../../../helpers/useLanguage';
// import { Button } from 'antd/lib/radio'
import { addArticle, deleteArticle, addCategory } from '../../../redux/actions';
import { categoriesState, Article, ArticlePrice } from '../../../redux/reducers';
import { State } from '../../../redux/types';

const naturalSort: any = require('javascript-natural-sort'); // FIXME: добавить тайпинги и сделать импорт

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
interface ArticleSettingsOwnProps {}
interface ArticleSettingsStateProps {
  categories: categoriesState[]
  articles: Article[]
}
const mapStateToProps: MapStateToProps<
  ArticleSettingsStateProps,
  ArticleSettingsOwnProps,
  State
> = (state) => ({
  categories: state.categories,
  articles: state.articles,
});

interface ArticleSettingsDispatchProps {
  addArticle: (article: Article) => void
  deleteArticle: (article: Article) => void
}

const mapDispatchToProps: MapDispatchToPropsFunction<
  ArticleSettingsDispatchProps,
  ArticleSettingsOwnProps
> = (dispatch) => ({
  addArticle(article: Article) {
    dispatch(addArticle(article));
  },
  deleteArticle(article: Article) {
    dispatch(deleteArticle(article));
  },
});
const prices = ['one', 'two', 'three', 'four'];
const allInSecondHasFirst = (
  first: { [key: string]: any },
  second: { [key: string]: any },
): boolean => {
  for (const [key, value] of Object.entries(second)) {
    if (typeof value !== typeof first[key]) {
      return false;
    }
    if (typeof value === 'object') {
      return allInSecondHasFirst(first[key], value);
    }
    if (value !== first[key]) {
      return false;
    }
  }
  return true;
};

const ArticleSettings = Form.create({ name: 'article_settings' })(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    ({
      form: {
        getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue, validateFields,
      },
      addArticle,
      deleteArticle,
      categories,
      articles,
    }: WrappedFormInternalProps & ArticleSettingsDispatchProps & ArticleSettingsStateProps) => {
      const [
        addYourArticle,
        categoryName,
        articleNumber,
        tax,
        name,
        description,
        type,
        allergens,
        additionalInfo,
        numOfFreeIngridients,
        back,
        save,
        deliveryCostArticle,
        inner,
        selfPickUp,
        restaurant,
        inActions,
        outOfSale,
        doYouWantToSaveChanges,
        dontSave,
        rewrite,
        cancel,
        articleAlreadyExistsDoYouWantToRewriteIt,
      ] = useLanguage(
        'addYourArticle',
        'categoryName',
        'articleNumber',
        'tax',
        'name',
        'description',
        'type',
        'allergens',
        'additionalInfo',
        'numOfFreeIngridients',
        'back',
        'save',
        'deliveryCostArticle',
        'selfPickUp',
        'inner',
        'restaurant',
        'inActions',
        'outOfSale',
        'doYouWantToSaveChanges',
        'dontSave',
        'rewrite',
        'cancel',
        'articleAlreadyExistsDoYouWantToRewriteIt',
      );
      const [prices, setPrices] = useState(['main']);
      const [search, setSearch] = useState('');
      const [openModal, setOpenModal] = useState({
        onSave: () => {},
        onCancel: () => {},
        title: '',
        leftText: '',
        rightText: '',
      });
      const [isModalVisible, setModalVisible] = useState(false);
      const catName = getFieldValue('categoryName');
      useEffect(() => {
        const cat = categories && categories.find(({ name }) => name === catName);
        if (cat && cat.sizes && cat.sizes.length) {
          setPrices(cat.sizes.map(({ name }) => name));
        } else {
          setPrices(['main']);
        }
      }, [catName]);
      const articlePrices: { [key: string]: ArticlePrice } = {};
      if (categories.length !== 0 && categories[0].sizes && categories[0].sizes.length !== 0) {
        categories[0].sizes.forEach(({ name }) => {
          articlePrices[name] = {
            deliveryCost: undefined,
            inner: undefined,
            restaurant: undefined,
            selfPickUp: undefined,
          };
        });
      } else {
        articlePrices.main = {
          deliveryCost: undefined,
          inner: undefined,
          restaurant: undefined,
          selfPickUp: undefined,
        };
      }
      const initialArticle = {
        additionalInfo: undefined,
        allergens: undefined,
        articleNumber: undefined,
        articlePrices,
        categoryName: categories[0].name,
        description: undefined,
        inActions: true,
        name: undefined,
        numOfFreeIngridients: 0,
        outOfSale: false,
        tax: '7',
        type: 'Artikel',
      };
      const handleDeleteArticle = (article: Article) => {
        deleteArticle(article);
      };
      const resetForm = useCallback(() => {
        setFieldsValue(initialArticle);
      }, [setFieldsValue, initialArticle]);
      const handleOutClick = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event && event.preventDefault && event.preventDefault();

        const {
          categoryName,
          articleNumber,
          tax,
          name: productName,
          description,
          type,
          allergens,
          additionalInfo,
          articlePrices,
          inActions,
          outOfSale,
          numOfFreeIngridients,
        } = getFieldsValue();
        const article: Article = {
          categoryName,
          article: articleNumber,
          productName,
          tax,
          description,
          type,
          numOfFreeIngridients,
          allergens,
          additionalInfo,
          prices: articlePrices,
          inActions,
          outOfSale,
        };
        if (allInSecondHasFirst(initialArticle, getFieldsValue())) {
          return;
        }
        setModalVisible(true);
        setOpenModal({
          title: doYouWantToSaveChanges,
          leftText: save,
          rightText: dontSave,
          onSave: () => {
            validateFields((err: any) => {
              if (!err) {
                const articleIdx = articles.findIndex(
                  ({ productName: articleName }) => articleName === article.productName,
                );
                if (articleIdx === -1) {
                  addArticle(article);
                  resetForm();
                  setModalVisible(false);
                } else {
                  setOpenModal({
                    title: articleAlreadyExistsDoYouWantToRewriteIt,
                    leftText: rewrite,
                    rightText: cancel,
                    onSave: () => {
                      addArticle(article);
                      resetForm();
                      setModalVisible(false);
                    },
                    onCancel: () => {
                      resetForm();
                      setModalVisible(false);
                    },
                  });
                }
              } else {
                setModalVisible(false);
              }
            });
          },
          onCancel: () => {
            resetForm();
            setModalVisible(false);
          },
        });
      }, []);
      useEffect(() => {
        (window as any).PPC = (window as any).PPC || {};
        if (allInSecondHasFirst(initialArticle, getFieldsValue())) {
          (window as any).PPC.onClick = null;
        } else {
          (window as any).PPC.onClick = handleOutClick;
        }
      });
      const handleEditClick = (editName: string) => {
        const article = articles.find(({ productName }) => productName === editName);
        if (article) {
          const {
            categoryName,
            article: articleNumber,
            tax,
            productName: name,
            description,
            type,
            allergens,
            additionalInfo,
            prices: articlePrices,
            inActions,
            outOfSale,
            numOfFreeIngridients,
          } = article;
          const articlePricesObj: { [key: string]: string } = {};
          for (const [key, value] of Object.entries(articlePrices)) {
            for (const [innerKey, innerValue] of Object.entries(value)) {
              articlePricesObj[`articlePrices[\'${key}\'].${innerKey}`] = innerValue;
            }
          }
          setFieldsValue({
            categoryName,
            articleNumber,
            tax,
            name,
            description,
            type,
            allergens,
            additionalInfo,
            inActions,
            outOfSale,
            numOfFreeIngridients,
            ...articlePricesObj,
          });
        }
      };
      const columns = [
        { title: articleNumber, dataIndex: 'article', key: 'article' },
        { title: name, dataIndex: 'productName', key: 'productName' },
        { title: description, dataIndex: 'description', key: 'description' },
        { title: categoryName, dataIndex: 'categoryName', key: 'categoryName' },
        { title: type, dataIndex: 'type', key: 'type' },
        { title: tax, dataIndex: 'tax', key: 'tax' },
        {
          title: '',
          dataIndex: 'action',
          key: 'action',
          render: (_name: string, article: any) => {
            const { productName } = article;
            return (
              <div className="CategorySettings-ActionsIcons">
                <Icon
                  type="edit"
                  onClick={() => handleEditClick(productName)}
                  style={{ width: '20px', height: '20px' }}
                />
                <Icon type="delete" onClick={() => handleDeleteArticle(article)} />
              </div>
            );
          },
        },
      ];
      const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          validateFields((err: any) => {
            if (!err) {
              const {
                categoryName,
                articleNumber,
                tax,
                name: productName,
                description,
                type,
                allergens,
                additionalInfo,
                articlePrices,
                inActions,
                outOfSale,
                numOfFreeIngridients,
              } = getFieldsValue();
              const article: Article = {
                categoryName,
                article: articleNumber,
                productName,
                tax,
                description,
                type,
                numOfFreeIngridients,
                allergens,
                additionalInfo,
                prices: articlePrices,
                inActions,
                outOfSale,
              };
              const articleIdx = articles.findIndex(
                ({ productName }) => productName === article.productName,
              );
              console.log('articleIdx: ', articleIdx);
              if (articleIdx !== -1) {
                console.log('OPEN MODAL');

                setOpenModal({
                  title: articleAlreadyExistsDoYouWantToRewriteIt,
                  leftText: rewrite,
                  rightText: cancel,
                  onSave: () => {
                    addArticle(article);
                    resetForm();
                    setModalVisible(false);
                  },
                  onCancel: () => {
                    resetForm();
                    setModalVisible(false);
                  },
                });
                setModalVisible(true);
              } else {
                addArticle(article);
              }
            }
          });
        },
        [articles, resetForm, setOpenModal],
      );

      console.log(getFieldsValue());

      const sortedProducts = useMemo(() => {
        // сортируем продукты с бека
        const unsortedProducts = articles.sort((a, b) => {
          if (a.article && b.article) {
            return naturalSort(a.article, b.article);
          }
          if (!a.article && !b.article && a.productName && b.productName) {
            return a.productName.localeCompare(b.productName);
          }
          return 0;
        });
        const formattedSearch = search.toLowerCase();
        return unsortedProducts.filter(
          (product) => (product.article
              && product.article
                .toString()
                .toLowerCase()
                .includes(formattedSearch))
            || product.productName.toLowerCase().includes(formattedSearch),
        );
      }, [articles, search]);
      console.log(getFieldsValue());
      return (
        <div>
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
          <Typography.Title level={2}>{addYourArticle}</Typography.Title>
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <div className="ArticleSettings">
              <div className="ArticleSettings-LeftPart">
                <Form.Item label={categoryName}>
                  {getFieldDecorator('categoryName', {
                    initialValue: categories[0].name,
                  })(
                    <Select>
                      {categories.map(({ name }) => (
                        <Select.Option key={name}>{name}</Select.Option>
                      ))}
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item label={articleNumber}>
                  {getFieldDecorator('articleNumber', {
                    rules: [{ required: true, message: "can't be empty" }],
                  })(<InputNumber />)}
                </Form.Item>
                <Form.Item label={tax}>
                  {getFieldDecorator('tax', { initialValue: '7' })(
                    <Select>
                      <Select.Option key="7">7%</Select.Option>
                      <Select.Option key="19">19%</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item label={name}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: "can't be empty" }],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label={description}>
                  {getFieldDecorator('description')(<Input />)}
                </Form.Item>
                <Form.Item label={type}>
                  {getFieldDecorator('type', { initialValue: 'Artikel' })(
                    <Select>
                      <Select.Option key="Artikel">Artikel</Select.Option>
                      <Select.Option key="Zutaten">Zutaten</Select.Option>
                      <Select.Option key="Getränk">Getränk</Select.Option>
                      <Select.Option key="Pfand">Pfand</Select.Option>
                      <Select.Option key="Menü">Menü</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item label={allergens}>{getFieldDecorator('allergens')(<Input />)}</Form.Item>
                <Form.Item label={additionalInfo}>
                  {getFieldDecorator('additionalInfo', {
                    rules: [{ required: true, message: "can't be empty" }],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label={numOfFreeIngridients}>
                  {getFieldDecorator('numOfFreeIngridients', {
                    initialValue: 0,
                    rules: [{ required: true, message: "can't be empty" }],
                  })(<InputNumber />)}
                </Form.Item>
              </div>
              <div className="ArticleSettings-RightPart">
                <div className="PricesTable">
                  {/* <div className="PricesNames"> */}
                  <div />
                  <div>{deliveryCostArticle}</div>
                  <div>{selfPickUp}</div>
                  <div>{inner}</div>
                  <div>{restaurant}</div>
                  {/* </div> */}
                  {prices.map((price) => (
                    <>
                      <div className="PriceName">{price}</div>
                      <Form.Item>
                        {getFieldDecorator(`articlePrices['${price}'].deliveryCostArticle`, {
                          rules: [{ required: true, message: "can't be empty" }],
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator(`articlePrices['${price}'].selfPickUp`, {
                          rules: [{ required: true, message: "can't be empty" }],
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator(`articlePrices['${price}'].inner`, {
                          rules: [{ required: true, message: "can't be empty" }],
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator(`articlePrices['${price}'].restaurant`, {
                          rules: [{ required: true, message: "can't be empty" }],
                        })(<Input />)}
                      </Form.Item>
                    </>
                  ))}
                </div>
                <div className="Checkboxes">
                  <Form.Item>
                    {getFieldDecorator('inActions', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(<Checkbox>{inActions}</Checkbox>)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('outOfSale', {
                      valuePropName: 'checked',
                      initialValue: false,
                    })(<Checkbox>{outOfSale}</Checkbox>)}
                  </Form.Item>
                </div>
                <div className="Buttons">
                  <Form.Item>
                    <Button type="danger" size="large" onClick={handleOutClick}>
                      {back}
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" size="large">
                      {save}
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
          <div>
            <Input
              style={{ width: '250px', marginTop: '10px', marginBottom: '10px' }}
              value={search}
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <Table columns={columns} dataSource={sortedProducts} bordered />
          </div>
        </div>
      );
    },
  ),
);

export default ArticleSettings;
