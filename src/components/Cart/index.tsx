import React, { useState } from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';

import { Table } from 'antd';

import { langMap, langMapType, langType } from '../../lang';

//types
import { TableRowSelection } from 'antd/lib/table';
import { CartProductsState } from '../../redux/reducersTypes';
import { State } from '../../redux/types';

import fieldNames from '../../constants/fieldNames';

const data = [
  {
    article: 1,
    quantity: 10,
    productName: 'Test',
    price: 60,
    children: [
      {
        productName: 'Test',
        price: 60,
      },
      {
        productName: 'Test',
        price: 60,
      },
      {
        productName: 'Test',
        price: 60,
      },
    ],
  },
  {
    article: 1,
    quantity: 10,
    productName: 'Test',
    price: 60,
    children: [
      {
        productName: 'Test',
        price: 60,
      },
      {
        productName: 'Test',
        price: 60,
      },
      {
        productName: 'Test',
        price: 60,
      },
    ],
  },
];

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

interface CartOwnProps {};

interface CartProps extends CartOwnProps, CartStateProps, CartDispatchProps {
}

function Cart({ cartProducts = [], lang } : CartProps) {
  const [cart, setCart] = useState('cartData');
  const [language, setLanguage] = useState(langMap[lang]);

  const columns = [
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
      render: (...args: any[]) => {
        console.log(args);
        return (<div>HI</div>)
      }
    }
  ];
  // console.log(cart);
  return (
    <div>
      <Table defaultExpandAllRows columns={columns} rowSelection={rowSelection} dataSource={data}/>
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

interface CartDispatchProps {};
const mapDispatchToProps: MapDispatchToPropsFunction<CartDispatchProps, CartOwnProps> = (dispatch, props) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
