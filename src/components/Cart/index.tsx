import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';

import { Table, Icon, Input } from 'antd';
import Column from 'antd/lib/table/Column';
import { langMap, langType } from '../../lang';

import { searchProducts } from '../../fakeBD';

import {
  addProductToCart,
  addAdditionToProductInCart,
  incrementQuantityOfProductInCart,
  decrementQuantityOfProductInCart,
  incrementQuantityOfAdditionOfProduct,
  decrementQuantityOfAdditionOfProduct,
  deleteProductFromCart,
  deleteAdditionOfProductFromCart
} from '../../redux/actions';
//types
import { TableRowSelection } from 'antd/lib/table';
import { CartProductsState, CartProductItem } from '../../redux/reducersTypes';
import { State } from '../../redux/types';

import './Cart.css';

type record = {
  article?: number,
  quantity?: number,
  productName: string,
  price: number,
}
// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<record> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log("OnSelect: ", Object.entries(record), selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log("onSelectAll: ", selected, selectedRows, changeRows);
  },
};

interface CartOwnProps { };

interface CartProps extends CartOwnProps, CartStateProps, CartDispatchProps {
}

function TableRow(props: any) {
  const isSelected = props.children.find(({ props: { record: { selected } } }: any) => selected);
  return (
    <tr className={`${props.className} ${isSelected ? "didolf" : ""}`}>
      {props.children}
    </tr>
  )
}

function Cart({ cartProducts, lang, addProduct, addAddition, deleteProduct, deleteAddition, incrementAddition, incrementProduct, decrementAddition, decrementProduct }: CartProps) {
  const [language, setLanguage] = useState(langMap[lang]);
  const [products, setProducts] = useState(searchProducts('') as typeof cartProducts);
  const [search, setSearch] = useState('');
  const [currentSelection, setCurrentSelection] = useState({ additionIndex: undefined, productIndex: 1 } as { additionIndex?: number, productIndex: number });

  cartProducts = useMemo(() => cartProducts.map((item) => {
    return { ...item, key: item.article, children: item.children ? item.children.map((child) => ({ ...child, key: item.article + ":" + child.article, parentArticle: item.article })) : undefined };
  }), [cartProducts]);

  const keyDownListener = useCallback((event) => {
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      const newSelectionArticle: typeof currentSelection = { productIndex: currentSelection.productIndex };
      if (currentSelection.additionIndex === undefined) {//если мы сейчас на продукте
        const productIndex = products.findIndex(({ article }) => article === currentSelection.productIndex);//находим его индекс в правой таблице
        const { article, children } = products[productIndex];
        if (event.code === 'ArrowUp') {
          // FIXME: Добавить возможность переходить с первого на последний продукт
          if (productIndex !== 0 && products.length !== 1) {//если кроме текущего продукта есть еще другие и текущий продукт не первый
            const { article, children } = products[productIndex - 1];//выбираем предыдущий продукт
            newSelectionArticle.productIndex = article as number;//устанавливаем предыдущий продукт текущим
            if (children && children.length !== 0) {//если есть добавки
              newSelectionArticle.additionIndex = children[children.length - 1].article;//берем последнюю добавку
            }
          }
        } else {//ArrowDown
          if (children && children.length !== 0) {//если есть добавки у текущего продукта
            newSelectionArticle.additionIndex = children[0].article;//выбираем первую добавку
          } else if (products.length !== 1) {//если кроме текущего продукта есть еще другие и он не последний
            newSelectionArticle.productIndex = products[(productIndex + 1) % products.length].article as number;//устанавливаем следующий продукт текущим
          }
        }
      } else {//если мы сейчас на добавке
        const productIndex = products.findIndex(({ article }) => article === currentSelection.productIndex);//находим индекс продукта в правой таблице
        const { article, children } = products[productIndex];
        if (!children || !children.length) {//если данные неактуальны и такой добавки нет - выходим
          setCurrentSelection(newSelectionArticle);
        }
        const additionIndex = (children as CartProductItem[]).findIndex(({ article }) => article === currentSelection.additionIndex);//находим индекс добавки
        const { article: additionArticle } = (children as CartProductItem[])[additionIndex];
        if (event.code === 'ArrowUp') {
          if (additionIndex !== 0) {//если это не первая добавка в списке
            newSelectionArticle.additionIndex = (children as CartProductItem[])[additionIndex - 1].article;//делаем текущей предыдущую добавку
          }
        } else {//ArrowDown
          if (additionIndex !== (children as CartProductItem[]).length - 1) {// если это не последняя добавка в списке
            newSelectionArticle.additionIndex = (children as CartProductItem[])[additionIndex + 1].article;
          } else {// последняя добавка в списке
            if (productIndex !== products.length - 1) {//если не последний продукт
              newSelectionArticle.productIndex = products[productIndex + 1].article as number;//сделать следующую добавку текущей
            }
          }
        }
      }
      setCurrentSelection(newSelectionArticle);
    }
  }, [products, currentSelection, setCurrentSelection]);

  const onMinusKeyDown = useCallback((event) => {
    if (event.key === '-') {
      const { productIndex, additionIndex } = currentSelection;
      if (additionIndex !== undefined) {
        decrementAddition(productIndex, additionIndex);// FIXME: Проверка на то, есть ли товар в корзине
      } else {
        decrementProduct(productIndex);// FIXME: Проверка на то, есть ли товар в корзине
      }
    }
  }, [currentSelection, decrementAddition, decrementProduct]);

  const onPlusOrEnterKeyDown = useCallback((event) => {
    if (event.key === '+' || event.code === 'Enter') {
      const { productIndex, additionIndex } = currentSelection;
      const product = products.find(({ article }) => article === productIndex)
      if (product) {
        const { article, productName, price, children } = product;
        if (additionIndex !== undefined) {
          if (Array.isArray(children)) {
            if (children !== undefined) {
              const child = children.find(({ article }) => article === additionIndex);
              if (child) {
                const { article, productName, price } = child;
                if (article !== undefined) {
                  addAddition(productIndex, article, productName, price);// FIXME: Проверка на то, есть ли товар в корзине
                }
              }
            }
          }
        } else {
          if (article !== undefined)
            addProduct(article, productName, price);// FIXME: Проверка на то, есть ли товар в корзине
        }
      }
    }
  }, [currentSelection, incrementAddition, incrementProduct]);

  useEffect(() => {
    window.addEventListener('keydown', keyDownListener);
    return () => {
      window.removeEventListener('keydown', keyDownListener);
    }
  }, [keyDownListener]);

  useEffect(() => {
    window.addEventListener('keydown', onPlusOrEnterKeyDown);
    return () => {
      window.removeEventListener('keydown', onPlusOrEnterKeyDown);
    }
  }, [onPlusOrEnterKeyDown]);

  useEffect(() => {
    window.addEventListener('keydown', onMinusKeyDown);
    return () => {
      window.removeEventListener('keydown', onMinusKeyDown);
    }
  }, [onMinusKeyDown]);

  useEffect(() => {
    setLanguage(langMap[lang]);
  }, [lang]);

  const setSelectedItems = useCallback((prods) => prods.map((comp: any) => {
    const { article } = comp;
    if (article === currentSelection.productIndex) {
      if (currentSelection.additionIndex === undefined) {
        return { ...comp, selected: true };
      } else {
        const childrenWithSelectedItem = comp.children.map((childItem: any) => {
          const { article } = childItem;
          if (article === currentSelection.additionIndex) {
            return ({ ...childItem, selected: true })
          }
          return childItem;
        })
        return { ...comp, children: childrenWithSelectedItem };
      }
    }
    return comp;
  }), [currentSelection]);

  const fetchProds = useCallback(() => searchProducts(search), [search]);

  useEffect(() => {
    let prods = fetchProds();
    setProducts(setSelectedItems(prods));
  }, [fetchProds, setSelectedItems, setProducts]);

  // useEffect(() => {
  //   if (products[0] && products[0].article !== currentSelection.productIndex) {
  //     setCurrentSelection({ productIndex: products[0].article as number });
  //   }
  // }, [products, setCurrentSelection]);

  const addToCart = useCallback((article: number, parentArticle?: number) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (parentArticle) {
        const product = products.find(({ article: productArticle }) => productArticle === parentArticle);
        if (product && product.children) {
          const addition = product.children.find(({ article: productArticle }) => productArticle === article);
          if (addition) {
            const { productName, price } = addition;
            addAddition(parentArticle, article, productName, price);
          }
        }
      } else {
        const addition = products.find(({ article: productArticle }) => productArticle === article);
        if (addition) {
          const { productName, price } = addition;
          addProduct(article, productName, price);
        }
      }
    }
  }, [products, addAddition, addProduct]);

  const decrementFromCart = useCallback((article: number, parentArticle?: number) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (parentArticle) {
        decrementAddition(parentArticle, article)
      } else {
        decrementProduct(article);
      }
    }
  }, [products, addAddition, addProduct]);

  const deleteFromCart = useCallback((article: number, parentArticle?: number) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (parentArticle) {
        deleteAddition(parentArticle, article);
      } else {
        deleteProduct(article);
      }
    }
  }, [products, addAddition, addProduct]);
  const columns1 = [
    {
      title: language.article,
      dataIndex: 'article',
      key: 'article',
    },
    {
      title: language.quantity,
      dataIndex: 'quantity',
      key: 'quantity',
      width: '12%',
    },
    {
      title: language.productName,
      dataIndex: 'productName',
      width: '30%',
      key: 'productName',
    },
    {
      title: language.price,
      dataIndex: 'price',
      width: '30%',
      key: 'price',
    },
    {
      key: 'action',
      title: 'Action',
      render: ({ parentArticle, article }: { parentArticle: number, article: number }) => {
        return (
          <div key={parentArticle + ":" + article}>
            <Icon type="close-square" onClick={deleteFromCart(article, parentArticle)} />
            <Icon type="minus-square" onClick={decrementFromCart(article, parentArticle)} />
            <Icon type="plus-square" onClick={addToCart(article, parentArticle)} />
          </div>)
      }
    }
  ];

  const columns2 = [
    {
      title: language.article,
      dataIndex: 'article',
      key: 'article',
    },
    {
      title: language.quantity,
      dataIndex: 'quantity',
      key: 'quantity',
      width: '12%',
    },
    {
      title: language.productName,
      dataIndex: 'productName',
      width: '30%',
      key: 'productName',
    },
    {
      title: language.price,
      dataIndex: 'price',
      width: '30%',
      key: 'price',
    },
    {
      key: 'action',
      title: 'Action',
      render: ({ parentArticle, article }: { parentArticle: number, article: number }) => {
        return (
          <div key={article + ":" + parentArticle}>
            <Icon type="minus-square" onClick={decrementFromCart(article, parentArticle)} />
            <Icon type="plus-square" onClick={addToCart(article, parentArticle)} />
          </div>)
      }
    }
  ];
  return (
    <div className="cart">
      <div className="cart__order-table">
        <Input />
        <Table pagination={false} expandedRowKeys={cartProducts.map(({ article }) => article) as number[]} defaultExpandAllRows columns={columns1} rowSelection={rowSelection} dataSource={cartProducts} />
      </div>
      <div className="cart__products-table">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        <Table components={{ body: { row: TableRow } }} pagination={false} expandedRowKeys={products.map(({ article }) => article) as number[]} defaultExpandAllRows columns={columns2} rowSelection={rowSelection} dataSource={products} />
      </div>
    </div>
  )
};

interface CartStateProps {
  cartProducts: CartProductsState;
  lang: langType;
}

const mapStateToProps: MapStateToProps<CartStateProps, CartOwnProps, State> = (state, props) => {
  return {
    cartProducts: state.cartProducts,
    lang: state.languages.lang
  }
};

interface CartDispatchProps {
  addProduct: (article: number, productName: string, price: number) => void;
  addAddition: (productArticle: number, additionArticle: number, additionName: string, additionPrice: number) => void;
  deleteProduct: (productArticle: number) => void;
  deleteAddition: (productArticle: number, additionArticle: number) => void;
  incrementProduct: (productArticle: number) => void;
  decrementProduct: (productArticle: number) => void;
  incrementAddition: (productArticle: number, additionArticle: number) => void;
  decrementAddition: (productArticle: number, additionArticle: number) => void;
};

const mapDispatchToProps: MapDispatchToPropsFunction<CartDispatchProps, CartOwnProps> = (dispatch, props) => {
  return {
    addProduct(article: number, productName: string, price: number) {
      dispatch(addProductToCart(article, productName, price));
    },
    addAddition(productArticle: number, additionArticle: number, additionName: string, additionPrice: number) {
      dispatch(addAdditionToProductInCart(productArticle, additionArticle, additionName, additionPrice));
    },
    deleteProduct(productArticle: number) {
      dispatch(deleteProductFromCart(productArticle));
    },
    deleteAddition(productArticle: number, additionArticle: number) {
      dispatch(deleteAdditionOfProductFromCart(productArticle, additionArticle));
    },
    incrementProduct(productArticle: number) {
      dispatch(incrementQuantityOfProductInCart(productArticle));
    },
    decrementProduct(productArticle: number) {
      dispatch(decrementQuantityOfProductInCart(productArticle));
    },
    incrementAddition(productArticle: number, additionArticle: number) {
      dispatch(incrementQuantityOfAdditionOfProduct(productArticle, additionArticle));
    },
    decrementAddition(productArticle: number, additionArticle: number) {
      dispatch(decrementQuantityOfAdditionOfProduct(productArticle, additionArticle));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
