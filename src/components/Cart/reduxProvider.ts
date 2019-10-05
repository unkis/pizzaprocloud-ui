import { MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import {
  addProductToCart,
  addManyProductToCart,
  addAdditionToProductInCart,
  addManyAdditionToProductInCart,
  incrementQuantityOfProductInCart,
  decrementQuantityOfProductInCart,
  incrementQuantityOfAdditionOfProduct,
  decrementQuantityOfAdditionOfProduct,
  deleteProductFromCart,
  deleteAdditionOfProductFromCart,
  addToFormData,
} from '../../redux/actions';
import { State } from '../../redux/types';
import { CartOwnProps, CartDispatchProps, CartStateProps } from './CartTypes';

export const mapStateToProps: MapStateToProps<CartStateProps, CartOwnProps, State> = (state) => ({
  cartProducts: state.cartProducts,
  formDataState: state.formDataState,
  lang: state.languages.lang,
});

export const mapDispatchToProps: MapDispatchToPropsFunction<CartDispatchProps, CartOwnProps> = (
  dispatch,
) => ({
  addProduct(id: number, article: string, productName: string, price: number, tax: '7' | '19') {
    dispatch(addProductToCart(id, article, productName, price, tax));
  },
  addManyProduct(
    id: number,
    article: string,
    productName: string,
    price: number,
    tax: '7' | '19',
    quantity: number,
  ) {
    dispatch(addManyProductToCart(id, article, productName, price, tax, quantity));
  },
  addAddition(
    productIdx: number,
    additionId: number,
    additionName: string,
    additionPrice: number,
    additionTax: '7' | '19',
  ) {
    dispatch(
      addAdditionToProductInCart(
        productIdx,
        additionId,
        additionName,
        additionPrice,
        additionTax,
      ),
    );
  },
  addManyAddition(
    productIdx: number,
    additionId: number,
    additionName: string,
    additionPrice: number,
    additionTax: '7' | '19',
    quantity: number,
  ) {
    dispatch(
      addManyAdditionToProductInCart(
        productIdx,
        additionId,
        additionName,
        additionPrice,
        additionTax,
        quantity,
      ),
    );
  },
  deleteProduct(productIdx: number) {
    dispatch(deleteProductFromCart(productIdx));
  },
  deleteAddition(productIdx: number, additionId: number) {
    dispatch(deleteAdditionOfProductFromCart(productIdx, additionId));
  },
  incrementProduct(productIdx: number) {
    dispatch(incrementQuantityOfProductInCart(productIdx));
  },
  decrementProduct(productIdx: number) {
    dispatch(decrementQuantityOfProductInCart(productIdx));
  },
  incrementAddition(productIdx: number, additionId: number) {
    dispatch(incrementQuantityOfAdditionOfProduct(productIdx, additionId));
  },
  decrementAddition(
    productIdx: number,
    additionId: number,
    productName: string,
    price: number,
    tax: '7' | '19',
  ) {
    dispatch(
      decrementQuantityOfAdditionOfProduct(productIdx, additionId, productName, price, tax),
    );
  },
  addDataToFormData(id: string, value: string) {
    dispatch(addToFormData(id, value));
  },
});
