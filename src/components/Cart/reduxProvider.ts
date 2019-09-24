import {
  addProductToCart,
  addAdditionToProductInCart,
  incrementQuantityOfProductInCart,
  decrementQuantityOfProductInCart,
  incrementQuantityOfAdditionOfProduct,
  decrementQuantityOfAdditionOfProduct,
  deleteProductFromCart,
  deleteAdditionOfProductFromCart,
  addToFormData
} from '../../redux/actions';
import { State } from '../../redux/types';
import { MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { CartOwnProps, CartDispatchProps, CartStateProps } from './CartTypes';


export const mapStateToProps: MapStateToProps<CartStateProps, CartOwnProps, State> = (state) => {
  return {
    cartProducts: state.cartProducts,
    formDataState: state.formDataState,
    lang: state.languages.lang
  }
};



export const mapDispatchToProps: MapDispatchToPropsFunction<CartDispatchProps, CartOwnProps> = (dispatch) => {
  return {
    addProduct(article: number, productName: string, price: number, mwst: '7' | '19') {
      dispatch(addProductToCart(article, productName, price, mwst));
    },
    addAddition(productArticle: number, additionArticle: number, additionName: string, additionPrice: number, additionMwst: '7' | '19') {
      dispatch(addAdditionToProductInCart(productArticle, additionArticle, additionName, additionPrice, additionMwst));
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
    },
    addDataToFormData(id: string, value: string) {
      dispatch(addToFormData(id, value))
    },
  }
};
