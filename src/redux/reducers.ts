import { CHANGE_LANGUAGE, ADD_USER, LOGOUT_USER, formDataActions, cartProductsActions } from './actions';

import fieldNames from '../constants/fieldNames';
import { selectValues } from '../constants/selectValues';

import {
  LanguagesState,
  LanguageAction,
  UserState,
  UserAction,
  FormDataStateType,
  FormDataStateAction,
  CartProductsState,
  CartProductsAction
} from './reducersTypes';

export const languages = (state: LanguagesState = { lang: 'ru' }, action: LanguageAction) => {
    switch (action.type) {
        case CHANGE_LANGUAGE: {
            return { lang: action.lang };
        };
        default: return state;
    }
};

export const user = (state: UserState = { role: '', code: '' }, action: UserAction) => {
    switch (action.type) {
        case ADD_USER: {
            const { role, code } = action;
            return { role, code };
        };
        case LOGOUT_USER: {
            return {
                ...state,
                role: ''
            };
        }
        default: return state;
    }
};

export const initialFormDataState: any = {//TODO: add types
    [fieldNames.customerNumber]: '',
    [fieldNames.phoneNumber]: '',
    [fieldNames.customerNumber]: '',
    [fieldNames.phoneNumber]: '',
    [fieldNames.name]: '',
    [fieldNames.street]: '',
    [fieldNames.houseNumber]: '',
    [fieldNames.plz]: '',
    [fieldNames.city]: '',
    [fieldNames.clientComment]: '',
    [fieldNames.deliveryCost]: selectValues[0]
  };
  
export const formDataState = (state: FormDataStateType = initialFormDataState, action: FormDataStateAction) => {
    switch (action.type) {
      case formDataActions.ADD_TO_FORM_DATA: {
        return {
          ...state,
          [action.fieldName]: action.fieldValue
        };
      };
      case formDataActions.UPDATE_ALL_FIELDS: {
        const newState = { ...state };
        for (let [key, value] of Object.entries(action.newState)) {
          newState[key] = value;
        };
        return newState;
      };
      case formDataActions.CLEAR_ALL_FIELDS: {
        return {...initialFormDataState};
      };
      default:
        return state;
    };
  };

export const initialCartProductsState = [];

export const cartProducts = (state: CartProductsState = initialCartProductsState, action: CartProductsAction) => {
  switch (action.type) {

    case cartProductsActions.ADD_PRODUCT_TO_CART: {
      const { article, productName, price } = action;
      const newState = [...state];
      const articleIndex = newState.findIndex(({ article }) => article === article);
      if (articleIndex !== -1) {
        const prevQuantity = newState[articleIndex].quantity;
        if (prevQuantity) {
          newState[articleIndex] = { ...newState[articleIndex], quantity: prevQuantity + 1 };
        }
      } else {
        newState.push({ article, productName, price, quantity: 1 })
      }
      return newState;
    }
    default:
      return state;
  }
}
