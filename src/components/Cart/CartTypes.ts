import { FormComponentProps } from 'antd/lib/form/Form';
import { RouteComponentProps } from 'react-router';
import { langType } from '../../lang';
import {
  CartProductsState,
  FormDataStateType,
  CartProduct,
  CartAddition,
} from '../../redux/reducersTypes';
import { Article } from '../../redux/reducers';

export interface SearchItem {
  category?: string
  article?: string
  id: number
  productName: string
  price: number
  tax: '7' | '19'
  type: string
}

export interface TableProduct extends SearchItem {
  key: string
  article: string
  selected?: boolean
}

export interface TableCart extends CartProduct {
  key: string
  cart: boolean
  children?:
    | (CartAddition & {
        viewName: string
        key: string
        parentId: number
        parentIdx: number
        cart: boolean
      })[]
    | undefined
}

export interface CartOwnProps {}

export interface CartProps
  extends CartOwnProps,
    CartStateProps,
    CartDispatchProps,
    RouteComponentProps,
    FormComponentProps {}

export interface CartDispatchProps {
  addProduct: (
    id: number,
    article: string,
    productName: string,
    price: number,
    mwst: '7' | '19',
  ) => void
  addCustomProduct: (productName: string, price: number, mwst: '7' | '19') => void
  addManyProduct: (
    id: number,
    article: string,
    productName: string,
    price: number,
    mwst: '7' | '19',
    quantity: number,
  ) => void
  addAddition: (
    productArticle: number,
    additionArticle: number,
    additionName: string,
    additionPrice: number,
    additionMwst: '7' | '19',
  ) => void
  addManyAddition: (
    productArticle: number,
    additionArticle: number,
    additionName: string,
    additionPrice: number,
    additionMwst: '7' | '19',
    quantity: number,
  ) => void
  deleteProduct: (productIdx: number) => void
  deleteAddition: (productArticle: number, additionArticle: number) => void
  incrementProduct: (productArticle: number) => void
  decrementProduct: (productArticle: number) => void
  incrementAddition: (productArticle: number, additionArticle: number) => void
  decrementAddition: (
    productId: number,
    additionId: number,
    productName: string,
    price: number,
    tax: '7' | '19',
  ) => void
  addDataToFormData: (id: string, value: string) => void
}

export interface CartStateProps {
  cartProducts: CartProductsState
  lang: langType
  formDataState: FormDataStateType
  articles: Article[]
}

export interface ActionColumn {
  id: number
  parentIdx?: number
  idx: number
}
