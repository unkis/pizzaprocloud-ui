import { changeLanguageType, addUserType, logoutUserType } from './actionsTypes';
import { number } from 'prop-types';

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

export const addProductToCart= (article: number, productName: string, price: number) => 
  ({ type: cartProductsActions.ADD_PRODUCT_TO_CART, article, productName, price });

export const addAdditionToProductInCart = (productArticle: number, additionArticle: number, additionName: string, additionPrice: number) => 
  ({ type: cartProductsActions.ADD_ADDITION_TO_PRODUCT_IN_CART, productArticle, additionArticle, additionName, additionPrice });

export const incrementQuantityOfProductInCart = (productArticle: number) => ({ type: cartProductsActions.INCREMENT_QUANTITY_OF_PRODUCT_IN_CART, productArticle });

export const decrementQuantityOfProductInCart = (productArticle: number) => ({ type: cartProductsActions.DECREMENT_QUANTITY_OF_PRODUCT_IN_CART, productArticle });

export const incrementQuantityOfAdditionOfProduct = (productArticle: number, additionArticle: number) => 
  ({ type: cartProductsActions.INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT, productArticle, additionArticle });

export const decrementQuantityOfAdditionOfProduct =  (productArticle: number, additionArticle: number) => 
  ({ type: cartProductsActions.DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT, productArticle, additionArticle });
