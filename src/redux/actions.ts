import { changeLanguageType, addUserType, logoutUserType } from './actionsTypes';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const ADD_USER = 'ADD_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const formDataActions = {
  ADD_TO_FORM_DATA: 'ADD_TO_FORM_DATA',
  UPDATE_ALL_FIELDS: 'UPDATE_ALL_FIELDS',
  CLEAR_ALL_FIELDS: 'CLEAR_ALL_FIELDS'
};

export enum cartProductsActions {
  ADD_PRODUCT_TO_CART,
  ADD_ADDITION_TO_PRODUCT_IN_CART,
  DELETE_PRODUCT_FROM_CART,
  DELETE_ADDITION_OF_PRODUCT_FROM_CART,
  INCREMENT_QUANTITY_OF_PRODUCT_IN_CART,
  DECREMENT_QUANTITY_OF_PRODUCT_IN_CART,
  INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT,
  DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT,
};


export const changeLanguage: changeLanguageType = (lang) => ({ type: CHANGE_LANGUAGE, lang });

export const addUser: addUserType = (role, code) => ({ type: ADD_USER, role, code });

export const logoutUser: logoutUserType = () => ({ type: LOGOUT_USER });

export const addToFormData = (fieldName: string, fieldValue: string) => ({ type: formDataActions.ADD_TO_FORM_DATA, fieldName, fieldValue });

export const updateAllFieldsOfFormData = (newState: any) => ({ type: formDataActions.UPDATE_ALL_FIELDS, newState });

export const clearAllFields = () => ({ type: formDataActions.CLEAR_ALL_FIELDS });

export const addProductToCart = (id: number, article: string, productName: string, price: number, tax: '7' | '19') => 
  ({ type: cartProductsActions.ADD_PRODUCT_TO_CART, id, article, productName, price, tax });

export const addAdditionToProductInCart = (productId: number, additionId: number, additionName: string, additionPrice: number, additionTax: '7' | '19') => 
  ({ type: cartProductsActions.ADD_ADDITION_TO_PRODUCT_IN_CART, productId, additionId, additionName, additionPrice, additionTax });

export const deleteProductFromCart = (productId: number) => 
  ({ type: cartProductsActions.DELETE_PRODUCT_FROM_CART, productId });

export const deleteAdditionOfProductFromCart = (productId: number, additionId: number) => 
  ({ type: cartProductsActions.DELETE_ADDITION_OF_PRODUCT_FROM_CART, productId, additionId });

export const incrementQuantityOfProductInCart = (productId: number) => ({ type: cartProductsActions.INCREMENT_QUANTITY_OF_PRODUCT_IN_CART, productId });

export const decrementQuantityOfProductInCart = (productId: number) => ({ type: cartProductsActions.DECREMENT_QUANTITY_OF_PRODUCT_IN_CART, productId });

export const incrementQuantityOfAdditionOfProduct = (productId: number, additionId: number) => 
  ({ type: cartProductsActions.INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT, productId, additionId });

export const decrementQuantityOfAdditionOfProduct =  (productId: number, additionId: number) => 
  ({ type: cartProductsActions.DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT, productId, additionId });
