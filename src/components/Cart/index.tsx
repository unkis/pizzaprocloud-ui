import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Table, Icon, Input, Button, Alert } from 'antd';
import SumForm from './subcomponents/SumForm';

import { langMap } from '../../lang';

import { searchProducts } from '../../fakeBD';

//redux actions
import { mapStateToProps, mapDispatchToProps } from './reduxProvider';

//types
import { RouteComponentProps } from 'react-router';
import { CartOwnProps, CartProps, CartDispatchProps, CartStateProps, ActionColumn } from './CartTypes';

import './Cart.css';

import { ROOT_URL } from '../../constants/rootUrl';

function TableRow(props: any) {//строка таблицы с товарами для выбора. Нужна для установки выбранным товара
  const isSelected = props.children.find(({ props: { record: { selected } } }: any) => selected);
  return (
    <tr className={`${props.className} ${isSelected ? "didolf" : ""}`}>
      {props.children}
    </tr>
  )
}

const customTableComponents = { body: { row: TableRow } };//передается в prop components компонента Table чтобы использовать свою строку вместо дефолтной

const proudctsTableScrollParams = { y: 'calc(100vh - 40px - 32px - 75px - 60px - 1px)' };
const cartTableScrollParams = { y: 'calc(100vh - 40px - 32px - 75px - 60px - 240px - 1px - 20px)' };
const IconStyle = { fontSize: '16px' };

const selectSearchInputText = () => {//функция для выделения текста в поле поиска
  const target = document.querySelector('.cart__products-table .ant-input') as HTMLInputElement;
  (target).setRangeText(target.value, 0, target.value.length, 'select');
};

const ProductNameRenderer = (name: string) => {//компонент корзины с названием товара/добавки
  const testStr = name.match(/^([+]{1}[0-9]*)(.*)/);
  if (testStr) {
    const [, quantity, additionName] = testStr;
    return (<div className="addition"><span className="addition__quantity">{quantity}</span>{additionName}</div>);
  }
  return (name);
};

const NullComponent = () => null;//вспомогательный компонент, который ничего не рендерит

const scrollToCurrentSelectedItem = () => {//функция, которая скроллит до текущего выбранного товара/добавки
  const curItem = document.querySelector('.didolf');
  if (curItem) {
    curItem.scrollIntoView();
  }
}

function Cart({ cartProducts, addDataToFormData, formDataState: { discount = 0 }, formDataState, lang, addProduct, addAddition, deleteProduct, deleteAddition, decrementAddition, decrementProduct, history }: CartProps) {
  const [language, setLanguage] = useState(langMap[lang]);
  const [products, setProducts] = useState(searchProducts('') as typeof cartProducts);
  const [search, setSearch] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ message: '', description: '' });
  const [currentSelection, setCurrentSelection] = useState({ additionIndex: undefined, productIndex: 1 } as { additionIndex?: number, productIndex: number });

  const sortedProducts = useMemo(() => {//сортируем продукты с бека
    const unsortedProducts = products.sort((a, b) => {
      if (a.article && b.article) {
        return a.article - b.article
      }
      return 0;
    });
    unsortedProducts.forEach(product => {
      product.articleView = product.article;
      if (Array.isArray(product.children)) {
        product.children = product.children.sort((a, b) => a.productName.localeCompare(b.productName));
      }
    });
    const formattedSearch = search.toLowerCase();
    const newSelection: typeof currentSelection = { productIndex: 0, additionIndex: undefined };
    let wasBreaked = false;
    for (let product of unsortedProducts) {
      if (product.article.toString().toLowerCase().includes(formattedSearch) || product.productName.toLowerCase().includes(formattedSearch)) {
        newSelection.productIndex = product.article;
        break;
      } else if (product.children) {
        for (let child of product.children) {
          if (child.productName.toLowerCase().includes(formattedSearch)) {
            newSelection.productIndex = product.article;
            newSelection.additionIndex = child.article;
            wasBreaked = true;
            break;
          }
        }
        if (wasBreaked) {
          break;
        }
      }
    };
    setCurrentSelection(newSelection);
    return unsortedProducts;
  }, [products, search, setCurrentSelection]);

  const productsWithSelected = useMemo(() => {//обновляем выбранный сейчас товар в таблице с товарами
    return sortedProducts.map((product) => {
      if (product.article === currentSelection.productIndex && currentSelection.additionIndex === undefined) {
        product.selected = true;
      } else if (product.selected) {
        product.selected = undefined;
      }
      if (Array.isArray(product.children)) {
        product.children.forEach(child => {
          if (currentSelection.productIndex === product.article && currentSelection.additionIndex === child.article) {
            child.selected = true;
          } else if (child.selected && (currentSelection.additionIndex !== child.article || currentSelection.productIndex !== product.article)) {
            child.selected = undefined;
          }
        });
      }
      return product;
    })
  }, [sortedProducts, currentSelection]);

  const keyDownListener = useCallback((event: KeyboardEvent) => {//слушаем нажатия Arrow Up и Down и на их основе пушим в currentSelection
    event.stopPropagation();
    const newSelectionArticle: typeof currentSelection = { productIndex: currentSelection.productIndex };
    if (currentSelection.additionIndex === undefined) {//если мы сейчас на продукте
      const productIndex = sortedProducts.findIndex(({ article }) => article === currentSelection.productIndex);//находим его индекс в правой таблице
      const { children } = sortedProducts[productIndex];
      if (event.code === 'ArrowUp') {
        // FIXME: Добавить возможность переходить с первого на последний продукт
        if (productIndex !== 0 && sortedProducts.length !== 1) {//если кроме текущего продукта есть еще другие и текущий продукт не первый
          const { article, children } = sortedProducts[productIndex - 1];//выбираем предыдущий продукт
          newSelectionArticle.productIndex = article as number;//устанавливаем предыдущий продукт текущим
          if (children && children.length !== 0) {//если есть добавки
            newSelectionArticle.additionIndex = children[children.length - 1].article;//берем последнюю добавку
          }
        } else if (sortedProducts[sortedProducts.length - 1]){
          const newProduct = sortedProducts[sortedProducts.length - 1];
          newSelectionArticle.productIndex = newProduct.article;
          if (Array.isArray(newProduct.children)) {
            const additions = newProduct.children;
            newSelectionArticle.additionIndex = additions[additions.length - 1].article;
          }
        }
      } else {//ArrowDown
        if (Array.isArray(children) && children.length !== 0) {//если есть добавки у текущего продукта
          newSelectionArticle.additionIndex = children[0].article;//выбираем первую добавку
        } else if (sortedProducts.length !== 1) {//если кроме текущего продукта есть еще другие и он не последний
          newSelectionArticle.productIndex = sortedProducts[(productIndex + 1) % sortedProducts.length].article as number;//устанавливаем следующий продукт текущим
        }
      }
    } else {//если мы сейчас на добавке
      const productIndex = sortedProducts.findIndex(({ article }) => article === currentSelection.productIndex);//находим индекс продукта в правой таблице
      const { children } = sortedProducts[productIndex];
      if (!children || !children.length) {//если данные неактуальны и такой добавки нет - выходим
        setCurrentSelection(newSelectionArticle);
        return;
      }
      const additionIndex = children.findIndex(({ article }) => article === currentSelection.additionIndex);//находим индекс добавки
      if (event.code === 'ArrowUp') {
        if (additionIndex !== 0) {//если это не первая добавка в списке
          newSelectionArticle.additionIndex = children[additionIndex - 1].article;//делаем текущей предыдущую добавку
        }
      } else {//ArrowDown
        if (additionIndex !== children.length - 1) {// если это не последняя добавка в списке
          newSelectionArticle.additionIndex = children[additionIndex + 1].article;
        } else {// последняя добавка в списке
          if (productIndex !== sortedProducts.length - 1) {//если не последний продукт
            newSelectionArticle.productIndex = sortedProducts[productIndex + 1].article as number;//сделать следующий продукт текущим
          } else {//если продукт последний
            newSelectionArticle.productIndex = sortedProducts[0].article;//переходим на первый
          }
        }
      }
    }
    setCurrentSelection(newSelectionArticle);
  }, [sortedProducts, currentSelection, setCurrentSelection]);

  const onMinusKeyDown = useCallback(() => {//слушаем нажатия клавиши '-' и изменяем товары в корзине на основе этого
    const { productIndex, additionIndex } = currentSelection;
    const product = cartProducts.find(item => item.article === productIndex);
    if (additionIndex !== undefined) {
      if (product && Array.isArray(product.children)) {
        const addition = product.children.find(item => item.article === additionIndex);
        if (addition) {
          decrementAddition(productIndex, additionIndex);
        } else {
          setAlertMessage({ message: 'Не удалось уменьшить количество добавки', description: 'Добавки нет в корзине' });
          setIsAlert(true);
        }
      } else {
        setAlertMessage({ message: 'Не удалось уменьшить количество добавки', description: 'Товара нет в корзине' });
        setIsAlert(true);
      }
    } else {
      if (product) {
        decrementProduct(productIndex);
      } else {
        setAlertMessage({ message: 'Не удалось уменьшить количество товара', description: 'Товара нет в корзине' });
        setIsAlert(true);
      }
    }
    selectSearchInputText();
  }, [cartProducts, currentSelection, decrementAddition, decrementProduct, setIsAlert, setAlertMessage]);

  const onPlusOrEnterKeyDown = useCallback(() => {//слушаем нажатия '+' и 'enter' и изменяем товары в корзине на основе этого
    if (isAlert) {
      setIsAlert(false);
      return;
    }
    const { productIndex, additionIndex } = currentSelection;
    const product = sortedProducts.find(({ article }) => article === productIndex)
    if (product) {
      const { article, productName, price, children, mwst } = product;
      if (additionIndex !== undefined) {
        const isProductInCart = cartProducts.find(item => item.article === productIndex);
        if (isProductInCart) {
          if (Array.isArray(children)) {
            const child = children.find(({ article }) => article === additionIndex);
            if (child) {
              const { article, productName, price, mwst } = child;
              if (article !== undefined) {
                addAddition(productIndex, article, productName, price, mwst);// FIXME: Проверка на то, есть ли товар в корзине
              }
            }
          }
        } else {
          setAlertMessage({ message: 'Не удалось выбрать добавку', description: 'Товара нет в корзине' });
          setIsAlert(true);
        }
      } else {
        if (article !== undefined)
          addProduct(article, productName, price, mwst);// FIXME: Проверка на то, есть ли товар в корзине
      }
    }
    selectSearchInputText();
  }, [sortedProducts, isAlert, cartProducts, currentSelection, addAddition, addProduct, setIsAlert, setAlertMessage]);

  const onSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {//слушаем изменение строки поиска и убираем оттуда нажатие '-'
    if (event.target.value.slice(-1) === '-') {
      return;
    } else {
      setSearch(event.target.value);
    }
  }, [setSearch, onMinusKeyDown]);

  const addToCart = useCallback((article: number, parentArticle?: number) => {//функция добавления товара или добавки в корзину
    return () => {
      selectSearchInputText();
      if (parentArticle) {
        const product = sortedProducts.find(({ article: productArticle }) => productArticle === parentArticle);
        const isProductInCart = cartProducts.find(item => item.article === parentArticle);
        if (isProductInCart) {
          if (product && product.children) {
            const addition = product.children.find(({ article: productArticle }) => productArticle === article);
            if (addition) {
              const { productName, price, mwst } = addition;
              addAddition(parentArticle, article, productName, price, mwst);
            }
          }
        } else {
          setAlertMessage({ message: 'Не удалось выбрать добавку', description: 'Товара нет в корзине' });
          setIsAlert(true);
        }
      } else {
        const addition = sortedProducts.find(({ article: productArticle }) => productArticle === article);
        if (addition) {
          const { productName, price, mwst } = addition;
          addProduct(article, productName, price, mwst);
        }
      }
    }
  }, [sortedProducts, cartProducts, addAddition, addProduct, setIsAlert]);

  const decrementFromCart = useCallback((article: number, parentArticle?: number) => {//функция уменьшения продукта или добавки
    return () => {
      selectSearchInputText();
      const product = cartProducts.find(item => item.article === (parentArticle || article));
      if (parentArticle) {
        const isAdditionInCart = product && Array.isArray(product.children) && product.children.find(item => item.article === article);
        if (isAdditionInCart) {
          decrementAddition(parentArticle, article)
        } else {
          setAlertMessage({ message: 'Не удалось уменьшить количество добавки', description: 'Добавки нет в корзине' });
          setIsAlert(true);
        }
      } else if (product) {
        decrementProduct(article);
      } else {
        setAlertMessage({ message: 'Не удалось уменьшить количество товара', description: 'Товара нет в корзине' });
        setIsAlert(true);
      }
    }
  }, [cartProducts, decrementAddition, decrementProduct, setIsAlert, setAlertMessage]);

  const deleteFromCart = useCallback((article: number, parentArticle?: number) => {//функция удаления продукта или добавки из корзины
    return () => {
      selectSearchInputText();
      if (parentArticle) {
        deleteAddition(parentArticle, article);
      } else {
        deleteProduct(article);
      }
    }
  }, [deleteAddition, deleteProduct]);

  const onBackButtonClick = useCallback(() => {//функция на нажатие кнопки назад
    history.push(`${ROOT_URL}/menu`)
  }, [history]);

  //мемоизируем кнопки
  const DecrementFromCartIcon = useCallback(({ parentArticle, article }: ActionColumn) => <Icon style={IconStyle} type="minus-square" onClick={decrementFromCart(article, parentArticle)} />, [decrementFromCart]);
  const IncrementToCartIcon = useCallback(({ parentArticle, article }: ActionColumn) => <Icon style={IconStyle} type="plus-square" onClick={addToCart(article, parentArticle)} />, [addToCart]);
  const DeleteFromCartIcon = useCallback(({ parentArticle, article }: ActionColumn) => <Icon style={IconStyle} type="close-square" onClick={deleteFromCart(article, parentArticle)} />, [deleteFromCart]);
  const onFreeDeliveryClick = useCallback(() => addDataToFormData('deliveryCost', '0'), [addDataToFormData]);

  useEffect(() => {//на изменение строки поиска стягиваем с сервера список продуктов
    setProducts(searchProducts(search.toLowerCase()));
  }, [search, setProducts]);

  const onAlertClose = useCallback(() => setIsAlert(false), [setIsAlert]);//функция на закрытие предупреждения по крестику

  const allKeyDown = useCallback((event: KeyboardEvent) => {//функция-слушатель нажатия на кнопки
    if (event.code === 'F4') {
      onBackButtonClick();
    } else if (event.code === 'F5') {
      onFreeDeliveryClick();
    } else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      keyDownListener(event);
    } else if (event.key === '+' || event.code === 'Enter') {
      onPlusOrEnterKeyDown();
    } else if (event.key === '-') {
      onMinusKeyDown();
    }
  }, [onBackButtonClick, onFreeDeliveryClick, keyDownListener, onPlusOrEnterKeyDown, onMinusKeyDown]);

  useEffect(() => {//слушаем события нажатия кнопок
    window.addEventListener('keydown', allKeyDown);
    return () => {
      window.removeEventListener('keydown', allKeyDown);
    }
  }, [allKeyDown]);

  useEffect(() => {//изменяем язык при смене языка
    setLanguage(langMap[lang]);
    /* fix бага с переключением языка по нажатию ArrowUp или ArrowDown */
    const selected: HTMLElement | null = document.querySelector('.cart__products-table .ant-input');
    if (selected) {
      selected.focus()
    }
  }, [lang]);

  const cartProductsSum = useMemo(() => {//считаем сумму продуктов и дополнений на каждое изменение продуктов
    let cartProductsProductsSum = 0;
    let cartProductsAdditionsSum = 0;
    cartProducts.forEach(product => {
      cartProductsProductsSum += product.price * product.quantity;
      if (Array.isArray(product.children)) {
        product.children.forEach(child => {
          cartProductsAdditionsSum += child.price * child.quantity;
        });
      }
    })
    return {
      cartProductsProductsSum,
      cartProductsAdditionsSum
    };
  }, [cartProducts]);

  useEffect(() => {//обновляем значения вычисляемых полей
    const { cartProductsProductsSum, cartProductsAdditionsSum } = cartProductsSum
    addDataToFormData('greichten', cartProductsProductsSum.toString());

    addDataToFormData('zutaten', cartProductsAdditionsSum.toString());

    addDataToFormData('mwst_7', (Math.round((cartProductsProductsSum + cartProductsAdditionsSum) * 0.07 * 100) / 100).toString());

    addDataToFormData('mwst_19', (Math.round((cartProductsProductsSum + cartProductsAdditionsSum) * 0.19 * 100) / 100).toString());
  }, [cartProductsSum, addDataToFormData]);

  useEffect(() => {//вычисляем общую цену
    const { cartProductsProductsSum, cartProductsAdditionsSum } = cartProductsSum
    const deliveryCost = parseFloat(formDataState.deliveryCost) | 0;
    const newTotalPrice = (deliveryCost + (((100 - (discount > 100 ? 0 : discount)) / 100)) * (cartProductsProductsSum + cartProductsAdditionsSum)).toString();
    if (newTotalPrice !== formDataState['total_price']) {
      addDataToFormData('total_price', newTotalPrice);
    }
  }, [cartProductsSum, discount, formDataState, addDataToFormData]);

  const columns1 = useMemo(() => [
    {
      title: language.article,
      dataIndex: 'articleView',
      key: 'articleView',
    },
    {
      title: language.quantity,
      dataIndex: 'viewQuantity',
      key: 'quantity',
    },
    {
      title: language.productName,
      dataIndex: 'viewName',
      width: '60%',
      key: 'productName',
      render: ProductNameRenderer
    },
    {
      title: language.price,
      dataIndex: 'price',
      key: 'price',
    },
    {
      key: 'deleteFromCart',
      render: DeleteFromCartIcon
    },
    {
      key: 'decrementFromCart',
      render: DecrementFromCartIcon
    },
    {
      key: 'incrementToCart',
      render: IncrementToCartIcon
    }
  ], [language, DeleteFromCartIcon, DecrementFromCartIcon, IncrementToCartIcon]);

  const columns2 = useMemo(() => [
    {
      title: language.article,
      dataIndex: 'articleView',
      key: 'articleView',
    },
    {
      title: language.productName,
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: language.price,
      dataIndex: 'price',
      key: 'price',
    },
    {
      key: 'decrementFromCart',
      render: DecrementFromCartIcon

    },
    {
      key: 'incrementToCart',
      render: IncrementToCartIcon
    }
  ], [DecrementFromCartIcon, IncrementToCartIcon, language]);

  const cartProductsWithKeys = useMemo(() => {//проставляем ключи продуктам с бека
    return cartProducts.map((item) => {
      item.articleView = item.article;
      item.viewName = item.productName;
      item.viewQuantity = item.quantity;
      item.key = (item.article && item.article.toString()) || '0';
      if (item.children) {
        item.children = item.children.map(child => {
          child.viewName = `+${child.quantity} ${child.productName}`;
          child.key = item.article + ':' + child.article;
          child.parentArticle = item.article;
          return child;
        })
      }
      return item;
    });
  }, [cartProducts]);

  const cartProductsExpandedRowKeys = useMemo(() => cartProducts.map(({ article }) => {
    if (article) {
      return article.toString();
    }
    return '0';
  }), [cartProducts]);

  const productsExpandedRowKeys = useMemo(() => sortedProducts.map(({ article }) => {
    if (article) {
      return article;
    }
    return 0;
  }), [sortedProducts]);

  useEffect(() => {//проверяем не вышли ли мы за пределы области видимости. Если вышли - скроллимся
    const container = document.querySelector('.cart__products-table .ant-table-body');
    const curItem = document.querySelector('.didolf');
    if (container && curItem) {
      const containerRect = container.getBoundingClientRect();
      const curItemRect = curItem.getBoundingClientRect();
      if (containerRect.bottom <= curItemRect.bottom || containerRect.top >= curItemRect.top) {
        const timeoutId = setTimeout(scrollToCurrentSelectedItem, 0);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [currentSelection]);

  return (
    <div className="cart">
      {isAlert && <Alert
        className="warning"
        message={alertMessage.message}
        description={alertMessage.description}
        type="error"
        closable
        onClose={onAlertClose}
      />}
      <div className="cart__tables">
        <div className="cart__order-table">
          <div className="cart__order">
            <Input placeholder={language.comment} />
            <Table expandIcon={NullComponent} pagination={false} scroll={cartTableScrollParams} bordered expandedRowKeys={cartProductsExpandedRowKeys} defaultExpandAllRows columns={columns1} dataSource={cartProductsWithKeys} />
          </div>
          <SumForm />
        </div>
        <div className="cart__products-table">
          <Input value={search} prefix={<Icon type="search" />} onChange={onSearchChange} autoFocus />
          <Table components={customTableComponents} pagination={false} scroll={proudctsTableScrollParams} bordered expandIcon={NullComponent} expandedRowKeys={productsExpandedRowKeys} defaultExpandAllRows columns={columns2} dataSource={productsWithSelected} />
        </div>
      </div>
      <div className="cart__buttons">
        <Button type="danger" size="large" onClick={onBackButtonClick}>{language.back} / F4</Button>
        <Button type="dashed" size="large" onClick={onFreeDeliveryClick}>{language.freeDelivery} / F5</Button>
        <Button type="primary" size="large">{language.print} / F2</Button>
      </div>
    </div>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter<RouteComponentProps<CartDispatchProps & CartOwnProps & CartStateProps>, any>(Cart));
