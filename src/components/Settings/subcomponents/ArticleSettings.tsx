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
  AutoComplete,
} from 'antd';
import { WrappedFormInternalProps } from 'antd/lib/form/Form';

import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';

import { withRouter, RouteComponentProps } from 'react-router';
import useLanguage from '../../../helpers/useLanguage';

import { addArticle, deleteArticle } from '../../../redux/actions';
import { categoriesState, Article, ArticlePrice } from '../../../redux/reducers';
import { State } from '../../../redux/types';

const naturalSort: any = require('javascript-natural-sort'); // FIXME: добавить тайпинги и сделать импорт

export const selectTypes = ['Artikel', 'Zutaten', 'Getränk', 'Pfand', 'Menü'];

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
  articles: state.articles.map((article) => {
    const pricesCats = Object.keys(article.prices).filter(Boolean);
    return {
      ...article,
      price: article.prices[pricesCats[0]] && article.prices[pricesCats[0]].deliveryCostArticle,
    };
  }),
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
    withRouter<any, any>(
      ({
        form: {
          getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue, validateFields,
        },
        addArticle,
        deleteArticle,
        categories,
        articles,
        history,
      }: WrappedFormInternalProps &
        ArticleSettingsDispatchProps &
        ArticleSettingsStateProps &
        RouteComponentProps) => {
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
          price,
          notIncludeInMin,
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
          'price',
          'notIncludeInMin',
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
        const articlePrices: {
          [key: string]: ArticlePrice
        } = {};
        if (categories.length !== 0 && categories[0].sizes && categories[0].sizes.length !== 0) {
          categories[0].sizes.forEach(({ name }) => {
            articlePrices[name] = {
              deliveryCostArticle: '',
              inner: '',
              restaurant: '',
              selfPickUp: '',
            };
          });
        } else {
          articlePrices.main = {
            deliveryCostArticle: '',
            inner: '',
            restaurant: '',
            selfPickUp: '',
          };
        }
        const initCategoryName = Array.isArray(categories) && categories.length > 0 ? categories[0].name : undefined;
        const initialArticle = {
          additionalInfo: undefined,
          allergens: undefined,
          articleNumber: undefined,
          articlePrices,
          categoryName: initCategoryName,
          description: undefined,
          inActions: true,
          name: undefined,
          numOfFreeIngridients: 0,
          outOfSale: false,
          tax: '7',
        };
        const handleDeleteArticle = (article: Article) => {
          deleteArticle(article);
        };
        const resetForm = useCallback(() => {
          const articlePricesObj: { [key: string]: string } = {};
          for (const [key, value] of Object.entries(initialArticle.articlePrices)) {
            if (value) {
              for (const [innerKey, innerValue] of Object.entries(value)) {
                articlePricesObj[`articlePrices[\'${key}\'].${innerKey}`] = innerValue as any;
              }
            }
          }
          setFieldsValue({
            ...initialArticle,
            ...articlePricesObj,
            type: localStorage.getItem('atricleSettingsType') || 'Artikel',
          });
        }, [setFieldsValue, initialArticle]);
        const handleOutClick = useCallback(
          (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
            if (allInSecondHasFirst(getFieldsValue(), initialArticle)) {
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
                      localStorage.setItem('atricleSettingsType', article.type);
                      resetForm();
                      setModalVisible(false);
                    } else {
                      setOpenModal({
                        title: articleAlreadyExistsDoYouWantToRewriteIt,
                        leftText: rewrite,
                        rightText: cancel,
                        onSave: () => {
                          addArticle(article);
                          localStorage.setItem('atricleSettingsType', article.type);

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
          },
          [resetForm, addArticle, articles, validateFields, initialArticle],
        );
        useEffect(() => {
          (window as any).PPC = (window as any).PPC || {};
          if (allInSecondHasFirst(getFieldsValue(), initialArticle)) {
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
              if (value) {
                for (const [innerKey, innerValue] of Object.entries(value)) {
                  articlePricesObj[`articlePrices[\'${key}\'].${innerKey}`] = innerValue;
                }
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
          { title: price, dataIndex: 'price', key: 'price' },
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
                console.log('articlePrices: ', articlePrices);
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
                  prices: articlePrices.map((price: any) => {
                    console.log('PRICE BEFORE: ', { ...price });
                    const {
                      deliveryCostArticle, selfPickUp, inner, restaurant,
                    } = price;
                    if (deliveryCostArticle && !selfPickUp && !inner && !restaurant) {
                      price.selfPickUp = deliveryCostArticle;
                      price.inner = deliveryCostArticle;
                      price.restaurant = deliveryCostArticle;
                    } else if (deliveryCostArticle && selfPickUp && !inner && !restaurant) {
                      price.inner = selfPickUp;
                      price.restaurant = selfPickUp;
                    }
                    console.log('PRICE AFTER: ', { ...price });
                    return price;
                  }),
                  inActions,
                  outOfSale,
                };
                const articleIdx = articles.findIndex(
                  ({ productName }) => productName === article.productName,
                );
                if (articleIdx !== -1) {
                  setOpenModal({
                    title: articleAlreadyExistsDoYouWantToRewriteIt,
                    leftText: rewrite,
                    rightText: cancel,
                    onSave: () => {
                      addArticle(article);
                      localStorage.setItem('atricleSettingsType', article.type);
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
                  localStorage.setItem('atricleSettingsType', article.type);
                  resetForm();
                }
              }
            });
          },
          [articles, resetForm, setOpenModal, addArticle],
        );
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
        const onBackButtonClick = useCallback(() => {
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
            history.push('/settings/');
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
                    localStorage.setItem('atricleSettingsType', article.type);
                    resetForm();
                    setModalVisible(false);
                  } else {
                    setOpenModal({
                      title: articleAlreadyExistsDoYouWantToRewriteIt,
                      leftText: rewrite,
                      rightText: cancel,
                      onSave: () => {
                        addArticle(article);
                        localStorage.setItem('atricleSettingsType', article.type);
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
              history.push('/settings/');
              resetForm();
              setModalVisible(false);
            },
          });
        }, []);
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
                      initialValue:
                        Array.isArray(categories) && categories.length > 0
                          ? categories[0].name
                          : undefined,
                    })(
                      <Select>
                        {categories.map(({ name }) => (
                          <Select.Option key={name}>{name}</Select.Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item label={articleNumber}>
                    {getFieldDecorator('articleNumber')(
                      <AutoComplete
                        dataSource={articles
                          .map(({ article }) => article)
                          .filter((item) => (typeof item === 'string'
                            ? item === '' || item.includes(getFieldValue('articleNumber'))
                            : false))}
                      >
                        <Input />
                      </AutoComplete>,
                    )}
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
                    })(
                      <AutoComplete
                        dataSource={articles
                          .map(({ productName }) => productName)
                          .filter((item) => (typeof item === 'string'
                            ? item === '' || item.includes(getFieldValue('name'))
                            : false))}
                      >
                        <Input />
                      </AutoComplete>,
                    )}
                  </Form.Item>
                  <Form.Item label={description}>
                    {getFieldDecorator('description')(
                      <AutoComplete
                        dataSource={
                          articles
                            .map(({ description }) => description)
                            .filter((item) => (typeof item === 'string'
                              ? item === '' || item.includes(getFieldValue('description'))
                              : false)) as string[]
                        }
                      >
                        <Input />
                      </AutoComplete>,
                    )}
                  </Form.Item>
                  <Form.Item label={type}>
                    {getFieldDecorator('type', {
                      initialValue: localStorage.getItem('atricleSettingsType') || 'Artikel',
                    })(
                      <Select>
                        {selectTypes.map((name) => (
                          <Select.Option key={name}>{name}</Select.Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item label={allergens}>
                    {getFieldDecorator('allergens')(
                      <AutoComplete
                        dataSource={
                          articles
                            .map(({ allergens }) => allergens)
                            .filter((item) => (typeof item === 'string'
                              ? item === '' || item.includes(getFieldValue('allergens'))
                              : false)) as string[]
                        }
                      >
                        <Input />
                      </AutoComplete>,
                    )}
                  </Form.Item>
                  <Form.Item label={additionalInfo}>
                    {getFieldDecorator('additionalInfo')(
                      <AutoComplete
                        dataSource={
                          articles
                            .map(({ additionalInfo }) => additionalInfo)
                            .filter((item) => (typeof item === 'string'
                              ? item === '' || item.includes(getFieldValue('additionalInfo'))
                              : false)) as string[]
                        }
                      >
                        <Input />
                      </AutoComplete>,
                    )}
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
                          })(<InputNumber decimalSeparator="," />)}
                        </Form.Item>
                        <Form.Item>
                          {getFieldDecorator(`articlePrices['${price}'].selfPickUp`, {})(
                            <InputNumber decimalSeparator="," />,
                          )}
                        </Form.Item>
                        <Form.Item>
                          {getFieldDecorator(`articlePrices['${price}'].inner`, {})(
                            <InputNumber decimalSeparator="," />,
                          )}
                        </Form.Item>
                        <Form.Item>
                          {getFieldDecorator(`articlePrices['${price}'].restaurant`, {})(
                            <InputNumber decimalSeparator="," />,
                          )}
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
                    <Form.Item>
                      {getFieldDecorator('notIncludeInMin', {
                        valuePropName: 'checked',
                        initialValue: false,
                      })(<Checkbox>{notIncludeInMin}</Checkbox>)}
                    </Form.Item>
                  </div>
                  <div className="Buttons">
                    <Form.Item>
                      <Button type="danger" size="large" onClick={onBackButtonClick}>
                        {back}
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        style={{ background: 'green', color: 'white' }}
                        size="large"
                      >
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
  ),
);

export default ArticleSettings;
