import { FormComponentProps } from 'antd/lib/form/Form';
import { RouteComponentProps } from 'react-router';
import { langType } from '../../lang';
import { CartProductsState, FormDataStateType, CartProduct, CartAddition } from '../../redux/reducersTypes';


export interface SearchItem {
  category?: string;
  article?: string;
  id: number;
  productName: string;
  price: number;
  tax: '7' | '19';
  type: 'product' | 'addition';
};

export interface TableProduct extends SearchItem {
  article: string;
  selected?: boolean;
};

export interface TableCart extends CartProduct {
  key: string;
  cart: boolean;
  children?: (CartAddition & { viewName: string, key: string, parentId: number, cart: boolean })[] | undefined
}

export interface CartOwnProps { };

export interface CartProps extends CartOwnProps, CartStateProps, CartDispatchProps, RouteComponentProps, FormComponentProps {
}

export interface CartDispatchProps {
  addProduct: (id: number, article: string, productName: string, price: number, mwst: '7' | '19') => void;
  addAddition: (productArticle: number, additionArticle: number, additionName: string, additionPrice: number, additionMwst: '7' | '19') => void;
  deleteProduct: (productArticle: number) => void;
  deleteAddition: (productArticle: number, additionArticle: number) => void;
  incrementProduct: (productArticle: number) => void;
  decrementProduct: (productArticle: number) => void;
  incrementAddition: (productArticle: number, additionArticle: number) => void;
  decrementAddition: (productArticle: number, additionArticle: number) => void;
  addDataToFormData: (id: string, value: string) => void;
};

export interface CartStateProps {
  cartProducts: CartProductsState;
  lang: langType;
  formDataState: FormDataStateType;
}

export interface ActionColumn {
  id: number;
  parentId?: number;
};
