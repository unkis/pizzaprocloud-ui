import {
  CHANGE_LANGUAGE,
  ADD_USER,
  LOGOUT_USER,
  formDataActions,
  cartProductsActions,
} from './actions';

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
  CartProductsAction,
  SettingsAction,
  SettingsState,
} from './reducersTypes';

export const languages = (state: LanguagesState = { lang: 'ru' }, action: LanguageAction) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return { lang: action.lang };
    default:
      return state;
  }
};

export const settings = (
  state: SettingsState = {
    shopAddress: {
      city: 'Москва',
      street: 'Льва Толстого',
      house: 10,
      postIndex: 777777,
    },
  },
  action: SettingsAction,
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const user = (state: UserState = { role: '', code: '' }, action: UserAction) => {
  switch (action.type) {
    case ADD_USER: {
      const { role, code } = action;
      return { role, code };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        role: '',
      };
    }
    default:
      return state;
  }
};

export const initialFormDataState: any = {
  // TODO: add types
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
  [fieldNames.deliveryCost]: selectValues[0],
  isTaxSecondOnAll: false,
};

export const formDataState = (
  state: FormDataStateType = initialFormDataState,
  action: FormDataStateAction,
) => {
  switch (action.type) {
    case formDataActions.ADD_TO_FORM_DATA:
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };
    case formDataActions.UPDATE_ALL_FIELDS: {
      const newState = { ...state };
      for (const [key, value] of Object.entries(action.newState)) {
        newState[key] = value;
      }
      return newState;
    }
    case formDataActions.CLEAR_ALL_FIELDS:
      return { ...initialFormDataState };
    default:
      return state;
  }
};

export const initialCartProductsState = [];

export const cartProducts = (
  state: CartProductsState = initialCartProductsState,
  action: CartProductsAction,
) => {
  switch (action.type) {
    case cartProductsActions.ADD_PRODUCT_TO_CART: {
      const {
        id, article, productName, price, tax,
      } = action;

      if (state[state.length - 1] && state[state.length - 1].id === id) {
        const prevQuantity = state[state.length - 1].quantity;
        return [...state.slice(0, -1), { ...state[state.length - 1], quantity: prevQuantity + 1 }];
      }
      return [
        ...state,
        {
          id,
          article,
          productName,
          price,
          tax,
          quantity: 1,
        },
      ];
    }

    case cartProductsActions.ADD_CUSTOM_PRODUCT_TO_CART: {
      const { productName, price, tax } = action;

      return [
        ...state,
        {
          productName,
          price,
          tax,
          quantity: 1,
        },
      ];
    }

    case cartProductsActions.ADD_MANY_PRODUCT_TO_CART: {
      const {
        id, article, productName, price, tax, quantity,
      } = action;
      if (quantity <= 0 || isNaN(quantity)) {
        if (!isNaN(quantity) && state[state.length - 1] && state[state.length - 1].id === id) {
          const prevQuantity = state[state.length - 1].quantity;
          if (prevQuantity === -quantity) {
            return [...state.slice(0, -1)];
          }
          return [
            ...state.slice(0, -1),
            { ...state[state.length - 1], quantity: prevQuantity + quantity },
          ];
        }
        return state;
      }
      return [
        ...state,
        {
          id,
          article,
          productName,
          price,
          tax,
          quantity,
        },
      ];
    }

    case cartProductsActions.ADD_ADDITION_TO_PRODUCT_IN_CART: {
      const {
        productIdx, additionId, additionName, additionPrice, additionTax,
      } = action;
      const productIndex = productIdx;
      if (productIndex !== -1) {
        const oldAdditions = state[productIndex].additions;
        if (state[productIndex] && Array.isArray(oldAdditions)) {
          const additionArticleIndex = oldAdditions.findIndex(({ id }) => id === additionId);
          if (additionArticleIndex !== -1 && Array.isArray(state[productIndex].additions)) {
            const prevQiantity = oldAdditions[additionArticleIndex].quantity;
            if (prevQiantity !== -1) {
              return [
                ...state.slice(0, productIndex),
                {
                  ...state[productIndex],
                  additions: [
                    ...oldAdditions.slice(0, additionArticleIndex),
                    { ...oldAdditions[additionArticleIndex], quantity: prevQiantity + 1 },
                    ...oldAdditions.slice(additionArticleIndex + 1),
                  ],
                },
                ...state.slice(productIndex + 1),
              ];
            }
            return [
              ...state.slice(0, productIndex),
              {
                ...state[productIndex],
                additions: [
                  ...oldAdditions.slice(0, additionArticleIndex),
                  ...oldAdditions.slice(additionArticleIndex + 1),
                ],
              },
              ...state.slice(productIndex + 1),
            ];
          }
          const productAdditions = state[productIndex].additions;
          if (productAdditions !== undefined) {
            return [
              ...state.slice(0, productIndex),
              {
                ...state[productIndex],
                additions: [
                  ...productAdditions,
                  {
                    id: additionId,
                    productName: additionName,
                    price: additionPrice,
                    tax: additionTax,
                    quantity: 1,
                  },
                ],
              },
              ...state.slice(productIndex + 1),
            ];
          }
          return [
            ...state.slice(0, productIndex),
            {
              ...state[productIndex],
              additions: [
                {
                  id: additionId,
                  productName: additionName,
                  price: additionPrice,
                  tax: additionTax,
                  quantity: 1,
                },
              ],
            },
            ...state.slice(productIndex + 1),
          ];
        }
        return [
          ...state.slice(0, productIndex),
          {
            ...state[productIndex],
            additions: [
              {
                id: additionId,
                productName: additionName,
                price: additionPrice,
                tax: additionTax,
                quantity: 1,
              },
            ],
          },
          ...state.slice(productIndex + 1),
        ];
      }
      return state;
    }

    case cartProductsActions.ADD_MANY_ADDITION_TO_PRODUCT_IN_CART: {
      const {
        productIdx, additionId, additionName, additionPrice, additionTax, quantity,
      } = action;
      if (isNaN(quantity)) {
        return state;
      }
      const productIndex = productIdx;
      if (productIndex !== -1) {
        const oldAdditions = state[productIndex].additions;
        if (state[productIndex] && Array.isArray(oldAdditions)) {
          const additionArticleIndex = oldAdditions.findIndex(({ id }) => id === additionId);
          if (additionArticleIndex !== -1 && Array.isArray(state[productIndex].additions)) {
            const prevQuantity = oldAdditions[additionArticleIndex].quantity;
            if (prevQuantity !== -1) {
              if (prevQuantity === -quantity) {
                return [
                  ...state.slice(0, productIndex),
                  {
                    ...state[productIndex],
                    additions: [
                      ...oldAdditions.slice(0, additionArticleIndex),
                      ...oldAdditions.slice(additionArticleIndex + 1),
                    ],
                  },
                  ...state.slice(productIndex + 1),
                ];
              }
              return [
                ...state.slice(0, productIndex),
                {
                  ...state[productIndex],
                  additions: [
                    ...oldAdditions.slice(0, additionArticleIndex),
                    { ...oldAdditions[additionArticleIndex], quantity: prevQuantity + quantity },
                    ...oldAdditions.slice(additionArticleIndex + 1),
                  ],
                },
                ...state.slice(productIndex + 1),
              ];
            }
            return [
              ...state.slice(0, productIndex),
              {
                ...state[productIndex],
                additions: [
                  ...oldAdditions.slice(0, additionArticleIndex),
                  ...oldAdditions.slice(additionArticleIndex + 1),
                ],
              },
              ...state.slice(productIndex + 1),
            ];
          }
          const productAdditions = state[productIndex].additions;
          if (productAdditions !== undefined) {
            return [
              ...state.slice(0, productIndex),
              {
                ...state[productIndex],
                additions: [
                  ...productAdditions,
                  {
                    id: additionId,
                    productName: additionName,
                    price: additionPrice,
                    tax: additionTax,
                    quantity,
                  },
                ],
              },
              ...state.slice(productIndex + 1),
            ];
          }
          return [
            ...state.slice(0, productIndex),
            {
              ...state[productIndex],
              additions: [
                {
                  id: additionId,
                  productName: additionName,
                  price: additionPrice,
                  tax: additionTax,
                  quantity,
                },
              ],
            },
            ...state.slice(productIndex + 1),
          ];
        }
        return [
          ...state.slice(0, productIndex),
          {
            ...state[productIndex],
            additions: [
              {
                id: additionId,
                productName: additionName,
                price: additionPrice,
                tax: additionTax,
                quantity,
              },
            ],
          },
          ...state.slice(productIndex + 1),
        ];
      }
      return state;
    }
    /* FIXME TESTS */
    case cartProductsActions.DELETE_PRODUCT_FROM_CART: {
      const { productIdx } = action;
      return state.filter((_, idx) => idx !== productIdx);
    }

    case cartProductsActions.DELETE_ADDITION_OF_PRODUCT_FROM_CART: {
      const { productIdx, additionId } = action;
      const productIndex = productIdx;
      console.log(productIdx);
      if (productIndex !== -1) {
        const { additions } = state[productIndex];
        if (additions) {
          return [
            ...state.slice(0, productIndex),
            { ...state[productIndex], additions: additions.filter(({ id }) => id !== additionId) },
            ...state.slice(productIndex + 1),
          ];
        }
      }
      return state;
    }
    /* END FIXME */
    case cartProductsActions.INCREMENT_QUANTITY_OF_PRODUCT_IN_CART: {
      const { productIdx } = action;
      const productIndex = productIdx;
      if (productIndex !== -1) {
        return [
          ...state.slice(0, productIndex),
          { ...state[productIndex], quantity: state[productIndex].quantity + 1 },
          ...state.slice(productIndex + 1),
        ];
      }
      return state;
    }

    case cartProductsActions.DECREMENT_QUANTITY_OF_PRODUCT_IN_CART: {
      const { productIdx } = action;
      const productIndex = productIdx;
      if (productIndex !== -1) {
        const currentQuantity = state[productIndex].quantity;
        if (currentQuantity > 1) {
          return [
            ...state.slice(0, productIndex),
            { ...state[productIndex], quantity: currentQuantity - 1 },
            ...state.slice(productIndex + 1),
          ];
        }
        return [...state.slice(0, productIndex), ...state.slice(productIndex + 1)];
      }
      return state;
    }

    case cartProductsActions.INCREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT: {
      const { productIdx, additionId } = action;
      const productIndex = productIdx;
      if (productIndex !== -1) {
        const { additions } = state[productIndex];
        if (additions) {
          const additionIndex = additions.findIndex(({ id }) => id === additionId);
          if (additionIndex !== -1) {
            const addition = additions[additionIndex];
            const oldQuantity = addition.quantity;
            if (oldQuantity !== -1) {
              return [
                ...state.slice(0, productIndex),
                {
                  ...state[productIndex],
                  additions: [
                    ...additions.slice(0, additionIndex),
                    { ...addition, quantity: oldQuantity + 1 },
                    ...additions.slice(additionIndex + 1),
                  ],
                },
                ...state.slice(productIndex + 1),
              ];
            }
            return [
              ...state.slice(0, productIndex),
              {
                ...state[productIndex],
                additions: [
                  ...additions.slice(0, additionIndex),
                  ...additions.slice(additionIndex + 1),
                ],
              },
              ...state.slice(productIndex + 1),
            ];
          }
        }
      }
      return state;
    }

    case cartProductsActions.DECREMENT_QUANTITY_OF_ADDITION_OF_PRODUCT: {
      const {
        productIdx, additionId, productName, price, tax,
      } = action;
      const productIndex = productIdx;
      if (productIndex !== -1) {
        const { additions } = state[productIndex];
        if (additions) {
          const additionIndex = additions.findIndex(({ id }) => id === additionId);
          if (additionIndex !== -1) {
            const addition = additions[additionIndex];
            if (addition.quantity !== 1) {
              return [
                ...state.slice(0, productIndex),
                {
                  ...state[productIndex],
                  additions: [
                    ...additions.slice(0, additionIndex),
                    { ...addition, quantity: addition.quantity - 1 },
                    ...additions.slice(additionIndex + 1),
                  ],
                },
                ...state.slice(productIndex + 1),
              ];
            }
            return [
              ...state.slice(0, productIndex),
              {
                ...state[productIndex],
                additions: [
                  ...additions.slice(0, additionIndex),
                  ...additions.slice(additionIndex + 1),
                ],
              },
              ...state.slice(productIndex + 1),
            ];
          }
          return [
            ...state.slice(0, productIndex),
            {
              ...state[productIndex],
              additions: [
                ...additions,
                {
                  id: additionId,
                  productName,
                  price,
                  tax,
                  quantity: -1,
                },
              ],
            },
          ];
        }
      }
      return state;
    }
    default:
      return state;
  }
};
