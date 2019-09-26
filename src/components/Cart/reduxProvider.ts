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
    addProduct(id: number, article: string, productName: string, price: number, tax: '7' | '19') {
      dispatch(addProductToCart(id, article, productName, price, tax));
    },
    addAddition(productId: number, additionId: number, additionName: string, additionPrice: number, additionTax: '7' | '19') {
      dispatch(addAdditionToProductInCart(productId, additionId, additionName, additionPrice, additionTax));
    },
    deleteProduct(productId: number) {
      dispatch(deleteProductFromCart(productId));
    },
    deleteAddition(productId: number, additionId: number) {
      dispatch(deleteAdditionOfProductFromCart(productId, additionId));
    },
    incrementProduct(productId: number) {
      dispatch(incrementQuantityOfProductInCart(productId));
    },
    decrementProduct(productId: number) {
      dispatch(decrementQuantityOfProductInCart(productId));
    },
    incrementAddition(productId: number, additionId: number) {
      dispatch(incrementQuantityOfAdditionOfProduct(productId, additionId));
    },
    decrementAddition(productId: number, additionId: number) {
      dispatch(decrementQuantityOfAdditionOfProduct(productId, additionId));
    },
    addDataToFormData(id: string, value: string) {
      dispatch(addToFormData(id, value))
    },
  }
};
