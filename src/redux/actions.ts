import { changeLanguageType, addUserType, logoutUserType } from './actionsTypes';
import { Article, Printer } from './reducers';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const ADD_USER = 'ADD_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const formDataActions = {
  ADD_TO_FORM_DATA: 'ADD_TO_FORM_DATA',
  UPDATE_ALL_FIELDS: 'UPDATE_ALL_FIELDS',
  CLEAR_ALL_FIELDS: 'CLEAR_ALL_FIELDS',
};

export enum cartProductsActions {
  ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
  ADD_CUSTOM_PRODUCT_TO_CART = 'ADD_CUSTOM_PRODUCT_TO_CART',
  ADD_ADDITION_TO_PRODUCT_IN_CART = 'ADD_ADDITION_TO_PRODUCT_IN_CART',
  ADD_MANY_PRODUCT_TO_CART = 'ADD_MANY_PRODUCT_TO_CART',
  ADD_MANY_ADDITION_TO_PRODUCT_IN_CART = 'ADD_MANY_ADDITION_TO_PRODUCT_IN_CART',
  DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART',
  DELETE_ADDITION_OF_PRODUCT_FROM_CART = 'DELETE_ADDITION_OF_PRODUCT_FROM_CART',
  INCREMENT_QUANTITY_OF_PRODUCT_IN_CART = 'INCREMENT_QUANTITY_OF_PRODUCT_IN_CART',
  DECREMENT_QUANTITY_OF_PRODUCT_IN_CART = 'DECREMENT_QUANTITY_OF_PRODUCT_IN_CART',
  INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT = 'INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT',
  DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT = 'DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT',
}

export enum categoriesActionsTypes {
  ADD_CATEGORY = 'ADD_CATEGORY',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
}

export enum articlesActionsTypes {
  ADD_ARTICLE = 'ADD_ARTICLE',
  DELETE_ARTICLE = 'DELETE_ARTICLE',
}

export enum printersActionsTypes {
  ADD_PRINTER = 'ADD_PRINTER',
  DELETE_PRINTER = 'DELETE_PRINTER',
}

export enum AuthActionsTypes {
  SET_EMAIL = 'SET_EMAIL',
  LOGOUT = 'LOGOUT',
}

export enum VoipActionsTypes {
  ADD_VOIP_SETTINGS = 'ADD_VOIP_SETTINGS',
  SET_VOIP_CONNECTED = 'SET_VOIP_CONNECTED',
  SET_VOIP_DISCONNECTED = 'SET_VOIP_DISCONNECTED',
}

export const changeLanguage: changeLanguageType = (lang) => ({ type: CHANGE_LANGUAGE, lang });

export const addUser: addUserType = (role, code) => ({ type: ADD_USER, role, code });

export const logoutUser: logoutUserType = () => ({ type: LOGOUT_USER });

export const addToFormData = (fieldName: string, fieldValue: string) => ({
  type: formDataActions.ADD_TO_FORM_DATA,
  fieldName,
  fieldValue,
});

export const updateAllFieldsOfFormData = (newState: any) => ({
  type: formDataActions.UPDATE_ALL_FIELDS,
  newState,
});

export const clearAllFields = () => ({ type: formDataActions.CLEAR_ALL_FIELDS });

export const addProductToCart = (
  id: number,
  article: string,
  productName: string,
  price: number,
  tax: '7' | '19',
) => ({
  type: cartProductsActions.ADD_PRODUCT_TO_CART,
  id,
  article,
  productName,
  price,
  tax,
});

export const addCustomProductToCart = (productName: string, price: number, tax: '7' | '19') => ({
  type: cartProductsActions.ADD_CUSTOM_PRODUCT_TO_CART,
  productName,
  price,
  tax,
});

export const addManyProductToCart = (
  id: number,
  article: string,
  productName: string,
  price: number,
  tax: '7' | '19',
  quantity: number,
) => ({
  type: cartProductsActions.ADD_MANY_PRODUCT_TO_CART,
  id,
  article,
  productName,
  price,
  tax,
  quantity,
});

export const addAdditionToProductInCart = (
  productIdx: number,
  additionId: number,
  additionName: string,
  additionPrice: number,
  additionTax: '7' | '19',
) => ({
  type: cartProductsActions.ADD_ADDITION_TO_PRODUCT_IN_CART,
  productIdx,
  additionId,
  additionName,
  additionPrice,
  additionTax,
});

export const addManyAdditionToProductInCart = (
  productIdx: number,
  additionId: number,
  additionName: string,
  additionPrice: number,
  additionTax: '7' | '19',
  quantity: number,
) => ({
  type: cartProductsActions.ADD_MANY_ADDITION_TO_PRODUCT_IN_CART,
  productIdx,
  additionId,
  additionName,
  additionPrice,
  additionTax,
  quantity,
});

export const deleteProductFromCart = (productIdx: number) => ({
  type: cartProductsActions.DELETE_PRODUCT_FROM_CART,
  productIdx,
});

export const deleteAdditionOfProductFromCart = (productIdx: number, additionId: number) => ({
  type: cartProductsActions.DELETE_ADDITION_OF_PRODUCT_FROM_CART,
  productIdx,
  additionId,
});

export const incrementQuantityOfProductInCart = (productIdx: number) => ({
  type: cartProductsActions.INCREMENT_QUANTITY_OF_PRODUCT_IN_CART,
  productIdx,
});

export const decrementQuantityOfProductInCart = (productIdx: number) => ({
  type: cartProductsActions.DECREMENT_QUANTITY_OF_PRODUCT_IN_CART,
  productIdx,
});

export const incrementQuantityOfAdditionOfProduct = (productIdx: number, additionId: number) => ({
  type: cartProductsActions.INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT,
  productIdx,
  additionId,
});

export const decrementQuantityOfAdditionOfProduct = (
  productIdx: number,
  additionId: number,
  productName: string,
  price: number,
  tax: '7' | '19',
) => ({
  type: cartProductsActions.DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT,
  productIdx,
  additionId,
  productName,
  price,
  tax,
});

export const addCategory = (
  name: string,
  subcategories: string[],
  printer: string,
  sizes: ({ num: number; name: string })[],
  iconUrl?: string,
  imageUrl?: string,
) => ({
  type: categoriesActionsTypes.ADD_CATEGORY,
  name,
  subcategories,
  printer,
  sizes,
  iconUrl,
  imageUrl,
});

export const deleteCategory = (name: string) => ({
  type: categoriesActionsTypes.DELETE_CATEGORY,
  name,
});

export const addArticle = (article: Article) => ({
  type: articlesActionsTypes.ADD_ARTICLE,
  article,
});

export const deleteArticle = (article: Article) => ({
  type: articlesActionsTypes.DELETE_ARTICLE,
  article,
});

export const addPrinter = (printer: Printer) => ({
  type: printersActionsTypes.ADD_PRINTER,
  printer,
});

export const deletePrinter = (printer: Printer) => ({
  type: printersActionsTypes.DELETE_PRINTER,
  printer,
});

export const setEmail = (email: string) => ({
  type: AuthActionsTypes.SET_EMAIL,
  email,
  authorized: true,
});

export const logout = () => ({
  type: AuthActionsTypes.LOGOUT,
});

export const addVoipSettings = (
  provider: string,
  ip: string,
  login: string,
  password: string,
  registar: string,
) => ({
  type: VoipActionsTypes.ADD_VOIP_SETTINGS,
  ip,
  login,
  password,
  provider,
  registar,
});

export const setVoipConnected = () => ({
  type: VoipActionsTypes.SET_VOIP_CONNECTED,
});

export const setVoipDisconnected = () => ({
  type: VoipActionsTypes.SET_VOIP_DISCONNECTED,
});
