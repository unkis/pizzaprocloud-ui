import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Table, Icon, Input, Button, Alert } from 'antd';
import SumForm from './subcomponents/SumForm';

import { langMap } from '../../lang';

import fakeBD, { searchProducts } from '../../fakeBD';

//redux actions
import { mapStateToProps, mapDispatchToProps } from './reduxProvider';

//types
import { RouteComponentProps } from 'react-router';
import { CartOwnProps, CartProps, CartDispatchProps, CartStateProps, ActionColumn, TableProduct, TableCart } from './CartTypes';

import './Cart.css';

import { ROOT_URL } from '../../constants/rootUrl';

const naturalSort: any = require('javascript-natural-sort');



const proudctsTableScrollParams = { y: 'calc(100vh - 40px - 32px - 75px - 60px - 1px)' };
const cartTableScrollParams = { y: 'calc(100vh - 40px - 32px - 75px - 60px - 240px - 1px - 20px)' };
const IconStyle = { fontSize: '16px' };

const selectSearchInputText = () => {//функция для выделения текста в поле поиска
  const target = document.querySelector('.cart__products-table .ant-input') as HTMLInputElement;
  target.focus();
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
  const [products, setProducts] = useState(searchProducts('') as TableProduct[]);
  const [search, setSearch] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ message: '', description: '' });
  const [currentSelection, setCurrentSelection] = useState(0);
  const [currentSelectedProductInCart, setProductInCart] = useState(0);
  const [wasImplisitySetted, setWasImplicitySetted] = useState(false);

  useEffect(() => {
    if (!wasImplisitySetted && cartProducts[cartProducts.length - 1]) {
      setProductInCart(cartProducts[cartProducts.length - 1].id);
    }
  }, [cartProducts]);

  const sortedProducts = useMemo(() => {//сортируем продукты с бека
    const unsortedProducts = products.sort((a, b) => {
      if (a.article && b.article) {
        return naturalSort(a, b);
      } else if (!a.article && !b.article && a.productName && b.productName) {
        return a.productName.localeCompare(b.productName);
      }
      return 0;
    });
    const formattedSearch = search.toLowerCase();
    let newSelection: typeof currentSelection = 0;
    for (let product of unsortedProducts) {
      if ((product.article && product.article.toLowerCase().includes(formattedSearch)) || product.productName.toLowerCase().includes(formattedSearch)) {
        newSelection = product.id;
        break;
      }
    };
    setCurrentSelection(newSelection);
    return unsortedProducts;
  }, [products, search, setCurrentSelection]);

  const productsWithSelected = useMemo(() => {//обновляем выбранный сейчас товар в таблице с товарами
    return sortedProducts.map((product) => {
      if (product.id === currentSelection) {
        product.selected = true;
      } else if (product.selected) {
        product.selected = undefined;
      }
      return product;
    })
  }, [sortedProducts, currentSelection]);
  const filteredProducts = useMemo(() => [{ header: 'ПРОДУКТЫ' }, ...productsWithSelected.filter(({ type }) => type === 'product'), { header: 'ДОБАВКИ' }, ...productsWithSelected.filter(({ type }) => type === 'addition')], [productsWithSelected])
  const keyDownListener = useCallback((event: KeyboardEvent) => {//слушаем нажатия Arrow Up и Down и на их основе пушим в currentSelection
    event.stopPropagation();
    let newSelectionArticle: typeof currentSelection = currentSelection;
    const productIndex = sortedProducts.findIndex(({ id }) => id === currentSelection);//находим его индекс в правой таблице
    if (event.code === 'ArrowUp') {
      if (productIndex !== 0 && sortedProducts.length !== 1) {//если кроме текущего продукта есть еще другие и текущий продукт не первый
        const { id } = sortedProducts[productIndex - 1];//выбираем предыдущий продукт
        newSelectionArticle = id;//устанавливаем предыдущий продукт текущим
      } else if (sortedProducts[sortedProducts.length - 1]) {
        const newProduct = sortedProducts[sortedProducts.length - 1];
        newSelectionArticle = newProduct.id;
      }
    } else {//ArrowDown
      if (sortedProducts.length !== 1) {//если кроме текущего продукта есть еще другие и он не последний
        newSelectionArticle = sortedProducts[(productIndex + 1) % sortedProducts.length].id;//устанавливаем следующий продукт текущим
      }
    }
    setCurrentSelection(newSelectionArticle);
  }, [sortedProducts, currentSelection, setCurrentSelection]);

  const TableRow = useCallback(function TableRow(props: any) {//строка таблицы с товарами для выбора. Нужна для установки выбранным товара
    let id: number, parentId: number;
    const isSelected = props.children.find(({ props: { record: { selected } } }: any) => selected);
    const isHeader = props.children.find(({ props: { record: { header } } }: any) => header);
    const isInCart = props.children.find(({ props: { record: { cart } } }: any) => cart);
    props.children.forEach(({ props: { record: { id: recordId, parentId: recordParentId } } }: any) => {
      id = recordId;
      parentId = recordParentId
    });
    console.log(props.children);
    return (
      <tr onClick={isInCart ? () => {setProductInCart(parentId || id); setWasImplicitySetted(true);} : () => null} className={`${props.className} ${isSelected ? "didolf" : ""} ${isHeader ? "cart__table-header" : ""}`}>
        {(isHeader && isHeader.props.record.header) || props.children}
      </tr>
    )
  }, []);
  const customTableComponents = useMemo(() => ({ body: { row: TableRow } }), [TableRow]);//передается в prop components компонента Table чтобы использовать свою строку вместо дефолтной

  const onMinusKeyDown = useCallback(() => {//слушаем нажатия клавиши '-' и изменяем товары в корзине на основе этого
    selectSearchInputText();
    const currentProduct = sortedProducts.find((product) => product.id === currentSelection);
    if (!currentProduct) {
      return;
    }
    const typeOfCurrentProduct = currentProduct.type;
    if (typeOfCurrentProduct === 'addition') {
      const lastAddedProduct = cartProducts.find(({ id }) => id === currentSelectedProductInCart);
      if (!lastAddedProduct) {
        return;
      }
      const hasAddition = lastAddedProduct.additions && lastAddedProduct.additions.find(({ id }) => id === currentProduct.id);
      if (hasAddition) {
        decrementAddition(lastAddedProduct.id, currentProduct.id);
      } else {
        setAlertMessage({ message: 'Не удалось уменьшить количество добавки', description: 'Добавки нет в корзине' });
        setIsAlert(true);
      }
    } else if (typeOfCurrentProduct === 'product') {
      const isProductInCart = cartProducts.find(({ id }) => id === currentProduct.id);
      if (isProductInCart) {
        decrementProduct(currentProduct.id);
      } else {
        setAlertMessage({ message: 'Не удалось уменьшить количество товара', description: 'Товара нет в корзине' });
        setIsAlert(true);
      }
    }
  }, [cartProducts, currentSelection, decrementAddition, decrementProduct, setIsAlert, setAlertMessage]);

  const onPlusOrEnterKeyDown = useCallback(() => {//слушаем нажатия '+' и 'enter' и изменяем товары в корзине на основе этого
    if (isAlert) {
      setIsAlert(false);
      return;
    }
    const currentProduct = sortedProducts.find(({ id }) => id === currentSelection);
    if (currentProduct) {
      const { id, article, productName, price, tax, type } = currentProduct;
      if (type === 'addition') {
        const lastAddedProduct = cartProducts.find(({ id }) => id === currentSelectedProductInCart);
        if (lastAddedProduct) {
          addAddition(lastAddedProduct.id, id, productName, price, tax);// FIXME: Проверка на то, есть ли товар в корзине
        } else {
          setAlertMessage({ message: 'Не удалось выбрать добавку', description: 'Товаров нет в корзине' });
          setIsAlert(true);
        }
      } else if (type === 'product') {
        addProduct(id, article, productName, price, tax);// FIXME: Проверка на то, есть ли товар в корзине
      }
    }
    selectSearchInputText();
  }, [sortedProducts, isAlert, cartProducts, currentSelection, addAddition, addProduct, setIsAlert, setAlertMessage]);

  const onSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {//слушаем изменение строки поиска и убираем оттуда нажатие '-'
    const lastChar = event.target.value.slice(-1);
    if (lastChar === '-' || lastChar === '+') {
      selectSearchInputText();
      return;
    } else {
      setSearch(event.target.value);
    }
  }, [setSearch, onMinusKeyDown]);

  const addToCart = useCallback((id: number, parentId?: number) => {//функция добавления товара или добавки в корзину
    return () => {
      selectSearchInputText();
      const currentProduct = products.find(({ id: productId }) => productId === id);
      if (!currentProduct) {
        return;
      }
      const typeOfCurrentProduct = currentProduct.type;
      if (typeOfCurrentProduct === 'addition') {
        const lastAddedProduct = cartProducts.find(({ id }) => id === (parentId || currentSelectedProductInCart));
        if (lastAddedProduct) {
          const { id, productName, price, tax } = currentProduct;
          addAddition(lastAddedProduct.id, id, productName, price, tax);
        } else {
          setAlertMessage({ message: 'Не удалось выбрать добавку', description: 'Товаров нет в корзине' });
          setIsAlert(true);
        }
      } else if (typeOfCurrentProduct === 'product') {
        const { id, article, productName, price, tax } = currentProduct;
        addProduct(id, article, productName, price, tax);
      }
    }
  }, [sortedProducts, cartProducts, addAddition, addProduct, setIsAlert]);

  const decrementFromCart = useCallback((id: number, parentId?: number) => {//функция уменьшения продукта или добавки
    return () => {
      selectSearchInputText();
      const currentProduct = products.find(({ id: productId }) => productId === id);
      if (!currentProduct) {
        return;
      }
      const typeOfCurrentProduct = currentProduct.type;
      const lastAddedProduct = cartProducts.find(({ id }) => id === (parentId || currentSelectedProductInCart));
      if (lastAddedProduct) {
        if (typeOfCurrentProduct === 'addition') {
          const isAdditionInCart = lastAddedProduct.additions && lastAddedProduct.additions.find(({ id: additionId }) => additionId === id);
          if (isAdditionInCart) {
            decrementAddition(lastAddedProduct.id, id)
          } else {
            setAlertMessage({ message: 'Не удалось уменьшить количество добавки', description: 'Добавки нет в корзине' });
            setIsAlert(true);
          }
        } else if (typeOfCurrentProduct === 'product') {
          decrementProduct(id);
        }
      } else {
        setAlertMessage({ message: `Не удалось уменьшить количество ${typeOfCurrentProduct === 'addition' ? 'добавки' : 'товара'}`, description: 'Товара нет в корзине' });
        setIsAlert(true);
      }
    }
  }, [cartProducts, decrementAddition, decrementProduct, setIsAlert, setAlertMessage]);

  const deleteFromCart = useCallback((id: number, parentId?: number) => {//функция удаления продукта или добавки из корзины
    return () => {
      selectSearchInputText();
      if (parentId) {
        deleteAddition(parentId, id);
      } else {
        deleteProduct(id);
      }
    }
  }, [deleteAddition, deleteProduct]);

  const onBackButtonClick = useCallback(() => {//функция на нажатие кнопки назад
    history.push(`${ROOT_URL}/menu`)
  }, [history]);

  //мемоизируем кнопки
  const DecrementFromCartIcon = useCallback(({ id, parentId }: ActionColumn) => <Icon style={IconStyle} type="minus-square" onClick={decrementFromCart(id, parentId)} />, [decrementFromCart]);
  const IncrementToCartIcon = useCallback(({ id, parentId }: ActionColumn) => <Icon style={IconStyle} type="plus-square" onClick={addToCart(id, parentId)} />, [addToCart]);
  const DeleteFromCartIcon = useCallback(({ id, parentId }: ActionColumn) => <Icon style={IconStyle} type="close-square" onClick={deleteFromCart(id, parentId)} />, [deleteFromCart]);
  const onFreeDeliveryClick = useCallback(() => addDataToFormData('deliveryCost', '0'), [addDataToFormData]);

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
      if (Array.isArray(product.additions)) {
        product.additions.forEach(child => {
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
      dataIndex: 'article',
      key: 'articleView',
    },
    {
      title: language.quantity,
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: language.productName,
      dataIndex: 'productName',
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
      dataIndex: 'article',
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

  const cartProductsWithKeys: TableCart[] = useMemo(() => {//проставляем ключи продуктам с бека
    return cartProducts.map((item) => {
      const additions = (Array.isArray(item.additions)) ? item.additions.map(child => ({
        ...child,
        viewName: `+${child.quantity} ${child.productName}`,
        key: item.id + ':' + child.id,
        parentId: item.id,
        cart: true
      })) : undefined;
      return ({
        ...item,
        key: (item.article && item.article.toString()) || '0',
        children: additions,
        cart: true
      })
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
    return '0';
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
            <Table components={customTableComponents} expandIcon={NullComponent} pagination={false} scroll={cartTableScrollParams} bordered expandedRowKeys={cartProductsExpandedRowKeys} defaultExpandAllRows columns={columns1} dataSource={cartProductsWithKeys} />
          </div>
          <SumForm />
        </div>
        <div className="cart__products-table">
          <Input value={search} prefix={<Icon type="search" />} onChange={onSearchChange} autoFocus />
          <Table components={customTableComponents} pagination={false} scroll={proudctsTableScrollParams} bordered expandIcon={NullComponent} expandedRowKeys={productsExpandedRowKeys} defaultExpandAllRows columns={columns2} dataSource={filteredProducts} />
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
