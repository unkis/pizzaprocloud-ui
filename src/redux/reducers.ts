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
    case CHANGE_LANGUAGE:
      return { lang: action.lang };
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
    case formDataActions.ADD_TO_FORM_DATA:
      return {
        ...state,
        [action.fieldName]: action.fieldValue
      };
    case formDataActions.UPDATE_ALL_FIELDS: {
      const newState = { ...state };
      for (let [key, value] of Object.entries(action.newState)) {
        newState[key] = value;
      };
      return newState;
    };
    case formDataActions.CLEAR_ALL_FIELDS:
      return { ...initialFormDataState };
    default:
      return state;
  };
};

export const initialCartProductsState = [];

export const cartProducts = (state: CartProductsState = initialCartProductsState, action: CartProductsAction) => {
  switch (action.type) {

    case cartProductsActions.ADD_PRODUCT_TO_CART: {
      const { article, productName, price, mwst } = action;

      const articleIndex = state.findIndex(({ article: newStateArticle }) => newStateArticle === article);
      if (articleIndex !== -1) {
        const prevQuantity = state[articleIndex].quantity;
        return [...state.slice(0, articleIndex), { ...state[articleIndex], quantity: prevQuantity + 1 }, ...state.slice(articleIndex + 1)]
      } else {
        return [{ article, productName, price, mwst, quantity: 1 }, ...state]
      }
    }

    case cartProductsActions.ADD_ADDITION_TO_PRODUCT_IN_CART: {
      const { productArticle, additionArticle, additionName, additionPrice, additionMwst } = action;
      const productArticleIndex = state.findIndex(({ article }) => article === productArticle);
      if (productArticleIndex !== -1) {
        const oldAdditions = state[productArticleIndex].children;
        if (state[productArticleIndex] && Array.isArray(oldAdditions)) {
          const additionArticleIndex = oldAdditions.findIndex(({ article }) => article === additionArticle);
          if (additionArticleIndex !== -1 && Array.isArray(state[productArticleIndex].children)) {
            const prevQiantity = oldAdditions[additionArticleIndex].quantity;
            return [
              ...state.slice(0, productArticleIndex),
              {
                ...state[productArticleIndex], children: [
                  ...oldAdditions.slice(0, additionArticleIndex),
                  { ...oldAdditions[additionArticleIndex], quantity: prevQiantity + 1 },
                  ...oldAdditions.slice(additionArticleIndex + 1)
                ]
              },
              ...state.slice(productArticleIndex + 1)
            ];
          } else {
            const productAdditions = state[productArticleIndex].children;
            if (productAdditions !== undefined) {
              return [
                ...state.slice(0, productArticleIndex),
                {
                  ...state[productArticleIndex], children: [
                    { article: additionArticle, productName: additionName, price: additionPrice, mwst: additionMwst, quantity: 1 },
                    ...productAdditions
                  ]
                },
                ...state.slice(productArticleIndex + 1)
              ];
            } else {
              return [
                ...state.slice(0, productArticleIndex),
                {
                  ...state[productArticleIndex], children: [
                    { article: additionArticle, productName: additionName, price: additionPrice, mwst: additionMwst, quantity: 1 },
                  ]
                },
                ...state.slice(productArticleIndex + 1)
              ];
            }
          }
        } else {
          return [
            ...state.slice(0, productArticleIndex),
            {
              ...state[productArticleIndex], children: [
                { article: additionArticle, productName: additionName, price: additionPrice, mwst: additionMwst, quantity: 1 },
              ]
            },
            ...state.slice(productArticleIndex + 1)
          ];
        }
      }
      return state;
    }
    /* FIXME TESTS */
    case cartProductsActions.DELETE_PRODUCT_FROM_CART: {
      const { productArticle } = action;
      return state.filter(({ article }) => article !== productArticle);
    }

    case cartProductsActions.DELETE_ADDITION_OF_PRODUCT_FROM_CART: {
      const { productArticle, additionArticle } = action;
      const productIndex = state.findIndex(({ article }) => article === productArticle);
      if (productIndex !== -1) {
        const additions = state[productIndex].children;
        if (additions) {
          return [
            ...state.slice(0, productIndex),
            { ...state[productIndex], children: additions.filter(({ article }) => article !== additionArticle) },
            ...state.slice(productIndex + 1)
          ]
        }
      }
      return state;
    }
    /* END FIXME */
    case cartProductsActions.INCREMENT_QUANTITY_OF_PRODUCT_IN_CART: {
      const { productArticle } = action;
      const productIndex = state.findIndex(({ article }) => article === productArticle);
      if (productIndex !== -1) {
        return [
          ...state.slice(0, productIndex),
          { ...state[productIndex], quantity: state[productIndex].quantity + 1 },
          ...state.slice(productIndex + 1)
        ]
      }
      return state;
    }

    case cartProductsActions.DECREMENT_QUANTITY_OF_PRODUCT_IN_CART: {
      const { productArticle } = action;
      const productIndex = state.findIndex(({ article }) => article === productArticle);
      if (productIndex !== -1) {
        const currentQuantity = state[productIndex].quantity;
        if (currentQuantity > 1) {
          return [
            ...state.slice(0, productIndex),
            { ...state[productIndex], quantity: currentQuantity - 1 },
            ...state.slice(productIndex + 1)
          ]
        } else {
          return [
            ...state.slice(0, productIndex),
            ...state.slice(productIndex + 1)
          ]
        }
      }
      return state;
    }

    case cartProductsActions.INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT: {
      const { productArticle, additionArticle } = action;
      const productIndex = state.findIndex(({ article }) => productArticle === article);
      if (productIndex !== -1) {
        const additions = state[productIndex].children;
        if (additions) {
          const additionIndex = additions.findIndex(({ article }) => article === additionArticle);
          if (additionIndex !== -1) {
            const addition = additions[additionIndex];
            return [
              ...state.slice(0, productIndex),
              {
                ...state[productIndex], children: [
                  ...additions.slice(0, additionIndex),
                  { ...addition, quantity: addition.quantity + 1 },
                  ...additions.slice(additionIndex + 1)
                ]
              },
              ...state.slice(productIndex + 1)
            ]
          }
        }
      }
      return state;
    }

    case cartProductsActions.DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT: {
      const { productArticle, additionArticle } = action;
      const productIndex = state.findIndex(({ article }) => productArticle === article);
      if (productIndex !== -1) {
        const additions = state[productIndex].children;
        if (additions) {
          const additionIndex = additions.findIndex(({ article }) => article === additionArticle);
          if (additionIndex !== -1) {
            const addition = additions[additionIndex];
            if (addition.quantity > 1) {
              return [
                ...state.slice(0, productIndex),
                {
                  ...state[productIndex], children: [
                    ...additions.slice(0, additionIndex),
                    { ...addition, quantity: addition.quantity - 1 },
                    ...additions.slice(additionIndex + 1)
                  ]
                },
                ...state.slice(productIndex + 1)
              ]
            } else {
              return [
                ...state.slice(0, productIndex),
                {
                  ...state[productIndex], children: [
                    ...additions.slice(0, additionIndex),
                    ...additions.slice(additionIndex + 1)
                  ]
                },
                ...state.slice(productIndex + 1)
              ]
            }
          }
        }
      }
      return state;
    }
    default:
      return state;
  }
}
