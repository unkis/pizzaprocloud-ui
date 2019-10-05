import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Table, Icon, Input, Button, Alert,
} from 'antd';
import { RouteComponentProps } from 'react-router';
import SumForm from './subcomponents/SumForm';
import ChooseQuantity from '../ChooseQuantity';

import { langMap } from '../../lang';
import { findLastIndexOf } from '../../helpers/findLastIndexOf';
import { searchProducts } from '../../fakeBD';

// redux actions
import { mapStateToProps, mapDispatchToProps } from './reduxProvider';

// types
import {
  CartOwnProps,
  CartProps,
  CartDispatchProps,
  CartStateProps,
  ActionColumn,
  TableProduct,
} from './CartTypes';

import './Cart.css';

import { ROOT_URL } from '../../constants/rootUrl';

const naturalSort: any = require('javascript-natural-sort'); // FIXME: добавить тайпинги и сделать импорт

const proudctsTableScrollParams = { y: 'calc(100vh - 40px - 32px - 75px - 60px - 1px)' };
const cartTableScrollParams = { y: 'calc(100vh - 40px - 32px - 75px - 60px - 160px - 1px - 20px)' };
const IconStyle = { fontSize: '16px' };

const selectSearchInputText = (targetElem?: any) => {
  // функция для выделения текста в поле поиска
  const target = targetElem || (document.querySelector('.cart__products-table .ant-input') as HTMLInputElement);
  target.focus();
  target.setRangeText(target.value, 0, target.value.length, 'select');
};

const ProductNameRenderer = (name: string) => {
  // компонент корзины с названием товара/добавки
  const testStr = name && name.match(/^([+-]{0,1}[0-9]*)(.*)/);
  if (testStr) {
    const [, quantity, additionName] = testStr;
    return (
      <div className="addition">
        <span className="addition__quantity">{quantity}</span>
        {additionName}
      </div>
    );
  }
  return name;
};

const NullComponent = () => null; // вспомогательный компонент, который ничего не рендерит

const scrollToCurrentSelectedItem = () => {
  // функция, которая скроллит до текущего выбранного товара/добавки
  const curItem = document.querySelector('.cart__products-table_selected');
  if (curItem) {
    curItem.scrollIntoView();
  }
};

const scrollToLastItemOfCart = () => {
  // функция, которая скроллит до последнего элемента корзины
  const curItem = document.querySelector('.cart__order .ant-table-tbody tr:last-child');
  if (curItem) {
    curItem.scrollIntoView();
  }
};

function Cart({
  cartProducts,
  addDataToFormData,
  formDataState: { discount = 0 },
  formDataState,
  lang,
  addProduct,
  addManyProduct,
  addAddition,
  addManyAddition,
  incrementProduct,
  incrementAddition,
  deleteProduct,
  deleteAddition,
  decrementAddition,
  decrementProduct,
  history,
}: CartProps) {
  const [language, setLanguage] = useState(langMap[lang]);

  const [products] = useState(searchProducts('') as TableProduct[]);
  const [search, setSearch] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ message: '', description: '' });
  const [currentSelection, setCurrentSelection] = useState(0);
  const [currentSelectionProduct, setCurrentSelectionProduct] = useState(products[0]);
  const [currentSelectedProductInCart, setProductInCart] = useState(-1);
  const [wasImplisitySetted, setWasImplicitySetted] = useState(false);
  const [signChooseQuantity, setSignChooseQuantity] = useState<boolean | '+' | '-'>(false);

  useEffect(() => {
    // если не был установлен руками текущий товар в корзине - ставим последний
    if (!wasImplisitySetted && cartProducts[cartProducts.length - 1]) {
      setProductInCart(cartProducts.length - 1);
    }
  }, [cartProducts, wasImplisitySetted, setProductInCart]);

  const sortedProducts = useMemo(() => {
    // сортируем продукты с бека
    const unsortedProducts = products.sort((a, b) => {
      if (a.article && b.article) {
        return naturalSort(a, b);
      }
      if (!a.article && !b.article && a.productName && b.productName) {
        return a.productName.localeCompare(b.productName);
      }
      return 0;
    });
    const formattedSearch = search.toLowerCase();
    let newSelection = -1;
    for (const product of unsortedProducts) {
      console.log(product.article && product.article.toString().toLowerCase().includes(formattedSearch));
      if (
        (product.article && product.article.toString().toLowerCase().includes(formattedSearch))
        || product.productName.toLowerCase().includes(formattedSearch)
      ) {
        newSelection = product.id;
        break;
      }
    }
    if (newSelection === -1) {
      setAlertMessage({
        message: 'Товар не найден',
        description: 'Нет товара с соответствующими параметрами',
      });
      setIsAlert(true);
      selectSearchInputText();
    }
    setCurrentSelection(newSelection);
    return unsortedProducts;
  }, [products, search, setCurrentSelection, setAlertMessage, setIsAlert]);

  const productsWithSelected = useMemo(
    () =>
      // обновляем выбранный сейчас товар в таблице с товарами
      sortedProducts.map((product, idx) => {
        product.key = idx.toString();
        if (product.id === currentSelection) {
          product.selected = true;
          setCurrentSelectionProduct(product);
        } else if (product.selected) {
          product.selected = undefined;
        }
        return product;
      }),
    [sortedProducts, currentSelection],
  );

  const filteredProducts = useMemo(
    () => [
      { header: 'ПРОДУКТЫ', key: 'ПРОДУКТЫ' },
      ...productsWithSelected.filter(({ type }) => type === 'product'),
      { header: 'ДОБАВКИ', key: 'ДОБАВКИ' },
      ...productsWithSelected.filter(({ type }) => type === 'addition'),
    ],
    [productsWithSelected],
  );

  const keyDownListener = useCallback(
    (event: KeyboardEvent) => {
      // слушаем нажатия Arrow Up и Down и на их основе пушим в currentSelection
      event.stopPropagation();
      let newSelectionArticle: typeof currentSelection = currentSelection;
      const productIndex = sortedProducts.findIndex(({ id }) => id === currentSelection); // находим его индекс в правой таблице
      if (event.code === 'ArrowUp') {
        if (productIndex !== 0 && sortedProducts.length !== 1) {
          // если кроме текущего продукта есть еще другие и текущий продукт не первый
          const { id } = sortedProducts[productIndex - 1]; // выбираем предыдущий продукт
          newSelectionArticle = id; // устанавливаем предыдущий продукт текущим
        } else if (sortedProducts[sortedProducts.length - 1]) {
          const newProduct = sortedProducts[sortedProducts.length - 1];
          newSelectionArticle = newProduct.id;
        }
      } else {
        // ArrowDown
        if (sortedProducts.length !== 1) {
          // если кроме текущего продукта есть еще другие и он не последний
          newSelectionArticle = sortedProducts[(productIndex + 1) % sortedProducts.length].id; // устанавливаем следующий продукт текущим
        }
      }
      setCurrentSelection(newSelectionArticle);
    },
    [sortedProducts, currentSelection, setCurrentSelection],
  );

  const onMinusKeyDown = useCallback(() => {
    // слушаем нажатия клавиши '-' и изменяем товары в корзине на основе этого
    const currentProduct = sortedProducts.find((product) => product.id === currentSelection);
    if (!currentProduct) {
      setAlertMessage({
        message: 'Не удалось уменьшить количество продукта/добавки',
        description: 'Не выбран продукт/добавка',
      });
      setIsAlert(true);
      return;
    }
    const typeOfCurrentProduct = currentProduct.type;
    if (typeOfCurrentProduct === 'addition') {
      const lastAddedProduct = cartProducts[currentSelectedProductInCart];
      if (!lastAddedProduct) {
        setAlertMessage({
          message: 'Не удалось уменьшить количество добавки',
          description: 'В корзине нет продуктов',
        });
        setIsAlert(true);
        return;
      }
      const { productName, price, tax } = currentProduct;
      setSignChooseQuantity('-');
      // decrementAddition(currentSelectedProductInCart, currentProduct.id, productName, price, tax);
    } else if (typeOfCurrentProduct === 'product') {
      const isProductInCart = findLastIndexOf(cartProducts, ({ id }) => id === currentProduct.id);
      if (isProductInCart !== -1) {
        setSignChooseQuantity('-');
        // decrementProduct(isProductInCart);
      } else {
        setAlertMessage({
          message: 'Не удалось уменьшить количество товара',
          description: 'Товара нет в корзине',
        });
        setIsAlert(true);
      }
    }
  }, [
      cartProducts,
      currentSelection,
      decrementAddition,
      decrementProduct,
      setIsAlert,
      setAlertMessage,
      currentSelectedProductInCart,
      sortedProducts,
      setSignChooseQuantity,
    ]);

  const onPlusOrEnterKeyDown = useCallback(() => {
    // слушаем нажатия '+' и 'enter' и изменяем товары в корзине на основе этого
    if (isAlert) {
      setIsAlert(false);
      return;
    }
    /* if (currentSelection !== -1) {
      if (!signChooseQuantity) {
        return setSignChooseQuantity('+');
      }
    } else {
      setAlertMessage({
        message: 'Не удалось уменьшить количество продукта/добавки',
        description: 'Не выбран продукт/добавка',
      });
      setIsAlert(true);
    }
    */
    const currentProduct = sortedProducts.find(({ id }) => id === currentSelection);
    if (currentProduct) {
      const {
        id, article, productName, price, tax, type,
      } = currentProduct;
      if (type === 'addition') {
        const lastAddedProduct = cartProducts[currentSelectedProductInCart];
        if (lastAddedProduct) {
          setSignChooseQuantity('+');
          // addAddition(currentSelectedProductInCart, id, productName, price, tax);
        } else {
          setAlertMessage({
            message: 'Не удалось выбрать добавку',
            description: 'Товаров нет в корзине',
          });
          setIsAlert(true);
        }
      } else if (type === 'product') {
        setSignChooseQuantity('+');
        // addProduct(id, article, productName, price, tax);// FIXME: Проверка на то, есть ли товар в корзине
      }
    }
    selectSearchInputText();
  }, [
      sortedProducts,
      isAlert,
      cartProducts,
      currentSelection,
      addAddition,
      addProduct,
      currentSelectedProductInCart,
      signChooseQuantity,
      setSignChooseQuantity,
    ]);

  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // слушаем изменение строки поиска и убираем оттуда нажатие '-'
      event.preventDefault();
      event.stopPropagation();
      const lastChar = event.target.value.slice(-1);
      if (lastChar === '-' || lastChar === '+') {
        setTimeout(() => selectSearchInputText(event.target), 0); // FIXME: разобраться, почему так
        return;
      }
      setSearch(event.target.value);
    },
    [setSearch],
  );

  const addInProducts = useCallback(
    (id: number) =>
      // функция добавления товара или добавки в корзину
      () => {
        setCurrentSelection(id);
        const currentProduct = sortedProducts.find(({ id: productId }) => productId === id);
        if (!currentProduct) {
          setAlertMessage({
            message: 'Не удалось ничего добавить',
            description: 'Не выбран продукт/добавка',
          });
          setIsAlert(true);
          return;
        }
        const typeOfCurrentProduct = currentProduct.type;
        const {
          article, productName, price, tax,
        } = currentProduct;
        if (typeOfCurrentProduct === 'addition') {
          const lastAddedProduct = cartProducts[currentSelectedProductInCart];
          if (lastAddedProduct) {
            setSignChooseQuantity('+');
            // addAddition(currentSelectedProductInCart, id, productName, price, tax);
          } else {
            setAlertMessage({
              message: 'Не удалось выбрать добавку',
              description: 'Товаров нет в корзине',
            });
            setIsAlert(true);
          }
        } else if (typeOfCurrentProduct === 'product') {
          setSignChooseQuantity('+');
          // addProduct(id, article, productName, price, tax);
        }
      },
    [
      sortedProducts,
      cartProducts,
      addAddition,
      addProduct,
      setIsAlert,
      setCurrentSelection,
      currentSelectedProductInCart,
    ],
  );

  const decrementInProducts = useCallback(
    (id: number) =>
      // функция уменьшения продукта или добавки
      () => {
        setCurrentSelection(id);
        const currentProduct = sortedProducts.find(({ id: productId }) => productId === id);
        if (!currentProduct) {
          setAlertMessage({
            message: 'Не удалось ничего добавить',
            description: 'Нет такого товара/добавки',
          });
          setIsAlert(true);
          return;
        }
        const typeOfCurrentProduct = currentProduct.type;
        const lastAddedProduct = cartProducts[currentSelectedProductInCart];
        if (typeOfCurrentProduct === 'addition') {
          const {
            id, productName, tax, price,
          } = currentProduct;
          if (lastAddedProduct) {
            setSignChooseQuantity('-');
            // decrementAddition(currentSelectedProductInCart, id, productName, price, tax);
          } else {
            setAlertMessage({
              message: 'Не удалось выбрать добавку',
              description: 'В корзине нет товаров',
            });
            setIsAlert(true);
          }
        } else if (typeOfCurrentProduct === 'product') {
          if (lastAddedProduct && lastAddedProduct.id === id) {
            setSignChooseQuantity('-');
            // decrementProduct(currentSelectedProductInCart);
          } else {
            setAlertMessage({
              message: 'Не удалось уменьшить количество товара',
              description: 'В корзине нет такого товара',
            });
            setIsAlert(true);
          }
        }
      },
    [
      sortedProducts,
      cartProducts,
      decrementAddition,
      decrementProduct,
      setIsAlert,
      setAlertMessage,
      currentSelectedProductInCart,
    ],
  );

  const incrementInCart = useCallback(
    (idx: number, parentIdx?: number) =>
      // функция добавления товара или добавки в корзину
      () => {
        let currentProduct;
        if (parentIdx === undefined) {
          currentProduct = cartProducts[idx];
        } else {
          const adds = cartProducts[parentIdx].additions;
          if (adds !== undefined) {
            currentProduct = adds[idx];
          } else {
            setAlertMessage({
              message: 'Не удалось ничего добавить',
              description: 'Нет такой добавки',
            });
            setIsAlert(true);
            return;
          }
        }
        if (!currentProduct) {
          setAlertMessage({
            message: 'Не удалось ничего добавить',
            description: 'Нет такой добавки/товара',
          });
          setIsAlert(true);
          return;
        }
        const { id } = currentProduct;
        if (parentIdx !== undefined) {
          const lastAddedProduct = cartProducts[parentIdx];
          if (lastAddedProduct) {
            incrementAddition(parentIdx, id);
          } else {
            setAlertMessage({
              message: 'Не удалось выбрать добавку',
              description: 'Товаров нет в корзине',
            });
            setIsAlert(true);
          }
        } else {
          incrementProduct(idx);
        }
      },
    [
      sortedProducts,
      cartProducts,
      addAddition,
      addProduct,
      setIsAlert,
      setCurrentSelection,
      currentSelectedProductInCart,
      incrementAddition,
      incrementProduct,
    ],
  );

  const decrementInCart = useCallback(
    (idx: number, parentIdx?: number) =>
      // функция уменьшения продукта или добавки
      () => {
        let currentProduct;
        if (parentIdx === undefined) {
          currentProduct = cartProducts[idx];
        } else {
          const adds = cartProducts[parentIdx].additions;
          if (adds !== undefined) {
            currentProduct = adds[idx];
          } else {
            setAlertMessage({
              message: 'Не удалось ничего добавить',
              description: 'Нет такой добавки',
            });
            setIsAlert(true);
            return;
          }
        }
        if (!currentProduct) {
          setAlertMessage({
            message: 'Не удалось ничего добавить',
            description: 'Нет такой добавки/товара',
          });
          setIsAlert(true);
          return;
        }
        if (parentIdx !== undefined) {
          const {
            id, productName, tax, price,
          } = currentProduct;
          if (parentIdx !== undefined) {
            decrementAddition(parentIdx, id, productName, price, tax);
          }
        } else {
          decrementProduct(idx);
        }
      },
    [cartProducts, decrementAddition, decrementProduct, setIsAlert, setAlertMessage],
  );

  const deleteInCart = useCallback(
    (idx: number, parentIdx?: number) =>
      // функция удаления продукта или добавки из корзины
      () => {
        let currentProduct;
        if (parentIdx === undefined) {
          currentProduct = cartProducts[idx];
        } else {
          const adds = cartProducts[parentIdx].additions;
          if (adds !== undefined) {
            currentProduct = adds[idx];
          } else {
            setAlertMessage({
              message: 'Не удалось ничего добавить',
              description: 'Нет такой добавки',
            });
            setIsAlert(true);
            return;
          }
        }
        if (!currentProduct) {
          setAlertMessage({
            message: 'Не удалось ничего добавить',
            description: 'Нет такой добавки/товара',
          });
          setIsAlert(true);
          return;
        }
        const { id } = currentProduct;
        if (parentIdx !== -1 && parentIdx !== undefined) {
          deleteAddition(parentIdx, id);
        } else {
          deleteProduct(idx);
        }
      },
    [deleteAddition, deleteProduct, cartProducts],
  );

  const onBackButtonClick = useCallback(() => {
    // функция на нажатие кнопки назад
    history.push(`${ROOT_URL}/menu`);
  }, [history]);

  const TableRow = useCallback(
    (props: any) => {
      // строка таблицы с товарами для выбора. Нужна для установки выбранным товара
      let id: number = 0;
      let parentId: number = 0;
      let idx = -1;
      let parentIdx: number | undefined;
      const isSelected = props.children.find(
        ({
          props: {
            record: { selected },
          },
        }: any) => selected,
      );
      const isHeader = props.children.find(
        ({
          props: {
            record: { header },
          },
        }: any) => header,
      );
      const isInCart = props.children.find(
        ({
          props: {
            record: { cart },
          },
        }: any) => cart,
      );
      props.children.forEach(
        ({
          props: {
            record: {
              id: recordId,
              parentId: recordParentId,
              idx: recordIdx,
              parentIdx: recordParentIdx,
            },
          },
        }: any) => {
          id = recordId;
          parentId = recordParentId;
          idx = recordIdx;
          parentIdx = recordParentIdx;
        },
      );
      return (
        <tr
          /* onClick={isInCart ? () => { setProductInCart(idx); setWasImplicitySetted(true); } : () => null} */ onDoubleClick={
            isInCart ? incrementInCart(idx, parentIdx) : addInProducts(id)
          }
          className={`${props.className} ${isHeader ? 'cart__table-header' : ''} ${
            isSelected ? 'cart__products-table_selected' : ''
            }`}
        >
          {isHeader ? props.children[0].props.record.header : props.children}
        </tr>
      );
    },
    [incrementInCart, addInProducts],
  );

  const customTableComponents = useMemo(() => ({ body: { row: TableRow } }), [TableRow]); // передается в prop components компонента Table чтобы использовать свою строку вместо дефолтной

  // мемоизируем кнопки
  const DecrementInCartIcon = useCallback(
    ({ parentIdx, idx }: ActionColumn) => (
      <Icon style={IconStyle} type="minus-square" onClick={decrementInCart(idx, parentIdx)} />
    ),
    [decrementInCart],
  );
  const IncrementInCartIcon = useCallback(
    ({ parentIdx, idx }: ActionColumn) => (
      <Icon style={IconStyle} type="plus-square" onClick={incrementInCart(idx, parentIdx)} />
    ),
    [incrementInCart],
  );
  const DeleteInCartIcon = useCallback(
    ({ parentIdx, idx }: ActionColumn) => (
      <Icon style={IconStyle} type="close-square" onClick={deleteInCart(idx, parentIdx)} />
    ),
    [deleteInCart],
  );
  const DecrementInProductsIcon = useCallback(
    ({ id }: ActionColumn) => (
      <Icon style={IconStyle} type="minus-square" onClick={decrementInProducts(id)} />
    ),
    [decrementInProducts],
  );
  const AddInProductsIcon = useCallback(
    ({ id }: ActionColumn) => (
      <Icon style={IconStyle} type="plus-square" onClick={addInProducts(id)} />
    ),
    [addInProducts],
  );

  const onFreeDeliveryClick = useCallback(() => addDataToFormData('deliveryCost', '0'), [
    addDataToFormData,
  ]);

  const onAlertClose = useCallback(() => setIsAlert(false), [setIsAlert]); // функция на закрытие предупреждения по крестику
  const onChooseQuantityClose = useCallback(
    (value: number) => {
      const currentProduct = sortedProducts.find(({ id }) => id === currentSelection);
      if (currentProduct) {
        const {
          id, article, productName, price, tax, type,
        } = currentProduct;
        if (type === 'addition') {
          const lastAddedProduct = cartProducts[currentSelectedProductInCart];
          if (lastAddedProduct) {
            addManyAddition(currentSelectedProductInCart, id, productName, price, tax, value);
          } else {
            setAlertMessage({
              message: 'Не удалось выбрать добавку',
              description: 'Товаров нет в корзине',
            });
            setIsAlert(true);
          }
        } else if (type === 'product') {
          addManyProduct(id, article, productName, price, tax, value); // FIXME: Проверка на то, есть ли товар в корзине
        }
      }
      setSignChooseQuantity(false);
      selectSearchInputText();
    },
    [
      sortedProducts,
      cartProducts,
      currentSelection,
      currentSelectedProductInCart,
      addManyAddition,
      setSignChooseQuantity,
      selectSearchInputText,
      setIsAlert,
      setAlertMessage,
      addManyProduct,
    ],
  ); // функция на закрытие предупреждения по крестику

  const allKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.stopPropagation();
      // функция-слушатель нажатия на кнопки
      if (event.code === 'F4') {
        onBackButtonClick();
      } else if (event.code === 'F5') {
        onFreeDeliveryClick();
      } else if (!signChooseQuantity && (event.code === 'ArrowUp' || event.code === 'ArrowDown')) {
        // потому что открыто окно выбора количества
        keyDownListener(event);
      } else if (!signChooseQuantity && (event.key === '+' || event.key === 'Enter')) {
        // потому что открыто окно выбора количества
        onPlusOrEnterKeyDown();
      } else if (event.key === '-') {
        onMinusKeyDown();
      }
    },
    [
      onBackButtonClick,
      onFreeDeliveryClick,
      keyDownListener,
      onPlusOrEnterKeyDown,
      onMinusKeyDown,
      signChooseQuantity,
    ],
  );

  useEffect(() => {
    // слушаем события нажатия кнопок
    window.addEventListener('keydown', allKeyDown);
    return () => {
      window.removeEventListener('keydown', allKeyDown);
    };
  }, [allKeyDown]);

  useEffect(() => {
    // изменяем язык при смене языка
    setLanguage(langMap[lang]);
    /* fix бага с переключением языка по нажатию ArrowUp или ArrowDown */
    const selected: HTMLElement | null = document.querySelector('.cart__products-table .ant-input');
    if (selected) {
      selected.focus();
    }
  }, [lang]);

  const cartProductsSum = useMemo(() => {
    // считаем сумму продуктов и дополнений на каждое изменение продуктов
    let cartProductsProductsSum = 0;
    let cartProductsAdditionsSum = 0;
    cartProducts.forEach((product) => {
      cartProductsProductsSum += product.price * product.quantity;
      let additionsSum = 0;
      if (Array.isArray(product.additions)) {
        product.additions.forEach((child) => {
          additionsSum += child.price * child.quantity;
        });
        cartProductsAdditionsSum += additionsSum >= 0 ? additionsSum : 0;
      }
    });
    return {
      cartProductsProductsSum,
      cartProductsAdditionsSum,
    };
  }, [cartProducts]);

  useEffect(() => {
    // обновляем значения вычисляемых полей
    const { cartProductsProductsSum, cartProductsAdditionsSum } = cartProductsSum;
    addDataToFormData('greichten', cartProductsProductsSum.toString());

    addDataToFormData('zutaten', cartProductsAdditionsSum.toString());

    addDataToFormData(
      'mwst_7',
      (
        Math.round((cartProductsProductsSum + cartProductsAdditionsSum) * 0.07 * 100) / 100
      ).toString(),
    );

    addDataToFormData(
      'mwst_19',
      (
        Math.round((cartProductsProductsSum + cartProductsAdditionsSum) * 0.19 * 100) / 100
      ).toString(),
    );
  }, [cartProductsSum, addDataToFormData]);

  useEffect(() => {
    // вычисляем общую цену
    const { cartProductsProductsSum, cartProductsAdditionsSum } = cartProductsSum;
    const deliveryCost = parseFloat(formDataState.deliveryCost) | 0;
    const newTotalPrice = (
      deliveryCost
      + ((100 - (discount > 100 ? 0 : discount)) / 100)
      * (cartProductsProductsSum + cartProductsAdditionsSum)
    ).toString();
    if (newTotalPrice !== formDataState.total_price) {
      addDataToFormData('total_price', newTotalPrice);
    }
  }, [cartProductsSum, discount, formDataState, addDataToFormData]);

  const columns1 = useMemo(
    () => [
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
        dataIndex: 'viewName',
        width: '60%',
        key: 'productName',
        render: ProductNameRenderer,
      },
      {
        title: language.price,
        dataIndex: 'price',
        key: 'price',
      },
      {
        key: 'deleteFromCart',
        render: DeleteInCartIcon,
      },
      {
        key: 'decrementFromCart',
        render: DecrementInCartIcon,
      },
      {
        key: 'incrementToCart',
        render: IncrementInCartIcon,
      },
    ],
    [language, DeleteInCartIcon, DecrementInCartIcon, IncrementInCartIcon],
  );

  const columns2 = useMemo(
    () => [
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
        render: DecrementInProductsIcon,
      },
      {
        key: 'incrementToCart',
        render: AddInProductsIcon,
      },
    ],
    [DecrementInProductsIcon, AddInProductsIcon, language],
  );

  const cartProductsWithKeys = useMemo(
    () =>
      // проставляем ключи продуктам с бека
      cartProducts.map((item, idx) => {
        const additions = Array.isArray(item.additions)
          ? item.additions.map((child, childIdx) => ({
            ...child,
            viewName: `${child.quantity > 0 ? '+' : ''}${child.quantity} ${child.productName}`,
            key: `${item.id}:${child.id}${idx}`,
            quantity: undefined,
            parentIdx: idx,
            parentId: item.id,
            idx: childIdx,
            cart: true,
          }))
          : undefined;
        return {
          ...item,
          key: (item.id && item.id.toString() + idx.toString()) || '0',
          viewName: item.productName,
          children: additions,
          idx,
          cart: true,
        };
      }),
    [cartProducts],
  );

  const productsExpandedRowKeys = useMemo(
    () => sortedProducts.map(({ article }) => {
      if (article) {
        return article;
      }
      return '0';
    }),
    [sortedProducts],
  );

  useEffect(() => {
    // проверяем не вышли ли мы за пределы области видимости. Если вышли - скроллимся
    const container = document.querySelector('.cart__order .ant-table-body');
    const curItem = document.querySelector('.cart__order .ant-table-tbody tr:last-child');
    if (container && curItem) {
      const containerRect = container.getBoundingClientRect();
      const curItemRect = curItem.getBoundingClientRect();
      if (containerRect.bottom <= curItemRect.bottom || containerRect.top >= curItemRect.top) {
        const timeoutId = setTimeout(scrollToLastItemOfCart, 0);
        return () => clearTimeout(timeoutId);
      }
    }
  });

  useEffect(() => {
    // проверяем не вышли ли мы за пределы области видимости. Если вышли - скроллимся
    const container = document.querySelector('.cart__products-table .ant-table-body');
    const curItem = document.querySelector('.cart__products-table_selected');
    if (container && curItem) {
      const containerRect = container.getBoundingClientRect();
      const curItemRect = curItem.getBoundingClientRect();
      if (containerRect.bottom <= curItemRect.bottom || containerRect.top >= curItemRect.top) {
        const timeoutId = setTimeout(scrollToCurrentSelectedItem, 0);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [currentSelection]);

  const cartProductsExpandedRowKeys = useMemo(
    () => cartProductsWithKeys.map(({ key }) => {
      if (key) {
        return key.toString();
      }
      return '0';
    }),
    [cartProductsWithKeys],
  );

  const currentSelectionProductQuantityInCart = useMemo(() => {
    if (cartProducts && cartProducts[currentSelectedProductInCart]) {
      const { quantity } = cartProducts && cartProducts[currentSelectedProductInCart];
      if (currentSelectionProduct.type === 'addition') {
        return quantity;
      }
      return signChooseQuantity === '-' ? quantity : 1;
    }
    return 1;
  }, [cartProducts, currentSelectionProduct, currentSelectedProductInCart, signChooseQuantity]);

  return (
    <div className="cart">
      {isAlert && (
        <Alert
          className="warning"
          message={alertMessage.message}
          description={alertMessage.description}
          type="error"
          closable
          onClose={onAlertClose}
        />
      )}
      {signChooseQuantity && (
        <ChooseQuantity
          product={currentSelectionProduct}
          onClose={onChooseQuantityClose}
          defaultValue={
            (signChooseQuantity === '-' ? -1 : 1) * currentSelectionProductQuantityInCart
          }
          min={-1 * currentSelectionProductQuantityInCart}
        />
      )}
      <div className="cart__tables">
        <div className="cart__order-table">
          <div className="cart__order">
            <Input placeholder={language.comment} />
            <Table
              components={customTableComponents}
              expandIcon={NullComponent}
              pagination={false}
              scroll={cartTableScrollParams}
              bordered
              expandedRowKeys={cartProductsExpandedRowKeys}
              defaultExpandAllRows
              columns={columns1}
              dataSource={cartProductsWithKeys}
            />
          </div>
          <SumForm />
        </div>
        <div className="cart__products-table">
          <Input
            value={search}
            prefix={<Icon type="search" />}
            onChange={onSearchChange}
            autoFocus
          />
          <Table
            components={customTableComponents}
            pagination={false}
            scroll={proudctsTableScrollParams}
            bordered
            expandIcon={NullComponent}
            expandedRowKeys={productsExpandedRowKeys}
            defaultExpandAllRows
            columns={columns2}
            dataSource={filteredProducts}
          />
        </div>
      </div>
      <div className="cart__buttons">
        <Button type="danger" size="large" onClick={onBackButtonClick}>
          {language.back}
          {' '}
          / F4
        </Button>
        <Button type="dashed" size="large" onClick={onFreeDeliveryClick}>
          {language.freeDelivery}
          {' '}
          / F5
        </Button>
        <Button type="primary" size="large">
          {language.print}
          {' '}
          / F2
        </Button>
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter<RouteComponentProps<CartDispatchProps & CartOwnProps & CartStateProps>, any>(Cart));
