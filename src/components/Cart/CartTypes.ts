import { FormComponentProps } from 'antd/lib/form/Form';
import { RouteComponentProps } from 'react-router';
import { langType } from '../../lang';
import { CartProductsState, FormDataStateType } from '../../redux/reducersTypes';


export interface CartOwnProps { };

export interface CartProps extends CartOwnProps, CartStateProps, CartDispatchProps, RouteComponentProps, FormComponentProps {
}

export interface CartDispatchProps {
  addProduct: (article: number, productName: string, price: number, mwst: '7' | '19') => void;
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
  article: number;
  parentArticle?: number;
};
