import { CHANGE_LANGUAGE, ADD_USER, LOGOUT_USER, formDataActions, cartProductsActions } from './actions';

import fieldNames from '../constants/fieldNames';
import { selectValues } from '../constants/selectValues';

import { deepCopy } from '../helpers/deepCopy';

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
      return { ...initialFormDataState };
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
      const newState = deepCopy(state);

      const articleIndex = newState.findIndex(({ article: newStateArticle }) => newStateArticle === article);
      if (articleIndex !== -1) {
        const prevQuantity = newState[articleIndex].quantity;
        newState[articleIndex] = { ...newState[articleIndex], quantity: prevQuantity + 1 };
      } else {
        newState.push({ article, productName, price, quantity: 1 })
      }
      return newState;
    }

    case cartProductsActions.ADD_ADDITION_TO_PRODUCT_IN_CART: {
      const { productArticle, additionArticle, additionName, additionPrice } = action;
      const newState = deepCopy(state);
      const productArticleIndex = newState.findIndex(({ article }) => article === productArticle);
      if (productArticleIndex !== -1) {
        const oldAdditions = newState[productArticleIndex].children;
        if (oldAdditions) {
          const additionArticleIndex = oldAdditions.findIndex(({ article }) => article === additionArticle);
          if (additionArticleIndex !== -1) {
            oldAdditions[additionArticleIndex].quantity = oldAdditions[additionArticleIndex].quantity + 1;
          } else {
            const productAdditions = newState[productArticleIndex].children;
            if (productAdditions !== undefined) {
              newState[productArticleIndex].children = [...(productAdditions), { article: additionArticle, productName: additionName, price: additionPrice, quantity: 1 }];
            } else {
              newState[productArticleIndex].children = [{ article: additionArticle, productName: additionName, price: additionPrice, quantity: 1 }];
            }
          }
        } else {
          newState[productArticleIndex].children = [{ article: additionArticle, productName: additionName, price: additionPrice, quantity: 1 }];
        }
      }
      return newState;
    }
/* FIXME TESTS */
    case cartProductsActions.DELETE_PRODUCT_FROM_CART: {
        const { productArticle } = action;
        const newState = deepCopy(state);
        return newState.filter(({ article }) => article !== productArticle);
    }

    case cartProductsActions.DELETE_ADDITION_OF_PRODUCT_FROM_CART: {
      const { productArticle, additionArticle } = action;
      const newState = deepCopy(state);
      const productIndex = newState.findIndex(({ article }) => article === productArticle);
      if (productIndex !== -1) {
        const additions = newState[productIndex].children;
        if (additions){
          newState[productIndex].children = additions.filter(({ article }) => article !== additionArticle);
        }
      }
      return newState;
    }
/* END FIXME */
    case cartProductsActions.INCREMENT_QUANTITY_OF_PRODUCT_IN_CART: {
      const { productArticle } = action;
      const newState = deepCopy(state);
      const productIndex = newState.findIndex(({ article }) => article === productArticle);
      if (productIndex !== -1) {
        newState[productIndex] = { ...newState[productIndex], quantity: newState[productIndex].quantity + 1 };
      }
      return newState;
    }

    case cartProductsActions.DECREMENT_QUANTITY_OF_PRODUCT_IN_CART: {
      const { productArticle } = action;
      const newState = deepCopy(state);
      const productIndex = newState.findIndex(({ article }) => article === productArticle);
      if (productIndex !== -1) {
        const currentQuantity = newState[productIndex].quantity;
        if (currentQuantity > 1) {
          newState[productIndex] = { ...newState[productIndex], quantity: currentQuantity - 1 };
        } else {
          newState.splice(productIndex, 1);
        }
      }
      return newState;
    }

    case cartProductsActions.INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT: {
      const { productArticle, additionArticle } = action;
      const newState = deepCopy(state);
      const productIndex = newState.findIndex(({ article }) => productArticle === article);
      if (productIndex !== -1) {
        const additions = newState[productIndex].children;
        if (additions) {
          const additionIndex = additions.findIndex(({ article }) => article === additionArticle);
          if (additionIndex !== -1) {
            const addition = additions[additionIndex];
            additions[additionIndex] = { ...addition, quantity: addition.quantity + 1 };
          }
        }
      }
      return newState;
    }

    case cartProductsActions.DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT: {
      const { productArticle, additionArticle } = action;
      const newState = deepCopy(state);
      const productIndex = newState.findIndex(({ article }) => productArticle === article);
      if (productIndex !== -1) {
        const additions = newState[productIndex].children;
        if (additions) {
          const additionIndex = additions.findIndex(({ article }) => article === additionArticle);
          if (additionIndex !== -1) {
            const addition = additions[additionIndex];
            if (addition.quantity > 1) {
              additions[additionIndex] = { ...addition, quantity: addition.quantity - 1 };
            } else {
              additions.splice(additionIndex, 1);
            }
          }
        }
      }
      return newState;
    }
    default:
      return state;
  }
}
