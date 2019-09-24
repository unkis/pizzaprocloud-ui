import { createStore } from 'redux';
import { appState } from './index';
import { initialFormDataState } from './reducers';
import { langType } from '../lang';
import { deepCopy } from '../helpers/deepCopy';
import {
  changeLanguage,
  addUser,
  logoutUser,
  addToFormData,
  updateAllFieldsOfFormData,
  clearAllFields,
  addProductToCart,
  addAdditionToProductInCart,
  incrementQuantityOfProductInCart,
  decrementQuantityOfProductInCart,
  incrementQuantityOfAdditionOfProduct,
  decrementQuantityOfAdditionOfProduct,
  deleteProductFromCart,
  deleteAdditionOfProductFromCart
} from './actions';

const initialState = {
  languages: {
    lang: 'ru' as langType
  },
  user: {
    role: '',
    code: ''
  },
  formDataState: initialFormDataState,
  cartProducts: [{
    article: 1,
    productName: 'testName',
    price: 120,
    quantity: 10,
    children: [{
      article: 10,
      productName: 'testName2',
      price: 20,
      quantity: 4
    },
    {
      article: 110,
      productName: 'testName4',
      price: 200,
      quantity: 3
    },
    {
      article: 1110,
      productName: 'testName5',
      price: 13,
      quantity: 14
    }]
  },
  {
    article: 2,
    productName: 'testName',
    price: 120,
    quantity: 10
  },
  {
    article: 12,
    productName: 'testName',
    price: 120,
    quantity: 3,
    children: [{
      article: 10,
      productName: 'testName2',
      price: 20,
      quantity: 4
    },
    {
      article: 110,
      productName: 'testName4',
      price: 200,
      quantity: 3
    },
    {
      article: 1110,
      productName: 'testName5',
      price: 13,
      quantity: 14
    }]
  }]
};

let store = createStore(appState, initialState);

describe('тесты на redux', () => {
  beforeEach(() => {
    store = createStore(appState, initialState)
  });

  describe('changeLanguage', () => {
    test('должен изменять язык в store после события changeLanguage', () => {
      store.dispatch(changeLanguage('de'));

      expect(store.getState()).toMatchObject({ ...initialState, languages: { lang: 'de' } });
    });
  });

  describe('addUser', () => {
    test('должен изменять данные пользователя в store после события addUser', () => {
      store.dispatch(addUser('test', '123'));

      expect(store.getState()).toMatchObject({ ...initialState, user: { role: 'test', code: '123' } });
    });
  });

  describe('logoutUser', () => {
    test('должен удалять роль пользователя в store после события logoutUser', () => {
      store.dispatch(addUser('test', '123'));
      store.dispatch(logoutUser());

      expect(store.getState()).toMatchObject({ ...initialState, user: { role: '', code: '123' } });
    });
  });

  describe('addToFormData', () => {
    test('должен добавлять поле в formDataState после события addToFormData', () => {
      store.dispatch(addToFormData('test', 'test'));

      expect(store.getState()).toMatchObject({ ...initialState, formDataState: { test: 'test' } });
    });
  });

  describe('updateAllFieldsOfFormData', () => {
    test('должен изменять поля в formDataState после события updateAllFieldsOfFormData', () => {
      const fields = {
        customerNumber: 'test1',
        phoneNumber: 'test2',
        name: 'test3',
        street: 'test4',
        houseNumber: 'test5',
        plz: 'test6',
        city: 'test7',
        clientComment: 'test8',
        deliveryCost: '1,00'
      }
      store.dispatch(updateAllFieldsOfFormData(fields));

      expect(store.getState()).toMatchObject({ ...initialState, formDataState: fields });
    });
  });

  describe('clearAllFields', () => {
    test('должен сбрасывать поля в formDataState в начальное состояние после события clearAllFields', () => {
      const fields = {
        customerNumber: 'test1',
        phoneNumber: 'test2',
        name: 'test3',
        street: 'test4',
        houseNumber: 'test5',
        plz: 'test6',
        city: 'test7',
        clientComment: 'test8',
        deliveryCost: '1,00'
      }

      store.dispatch(updateAllFieldsOfFormData(fields));
      store.dispatch(clearAllFields());

      expect(store.getState()).toMatchObject({ ...initialState, formDataState: initialFormDataState });
    });
  });

  describe('addProductToCart', () => {
    test('должен добавлять новый продукт в cartProducts после события addProductToCart', () => {
      const fields = {
        article: 1,
        productName: 'testProductName',
        price: 100
      };

      const newCartProducts = deepCopy(initialState.cartProducts);
      const productIndex = newCartProducts.findIndex(({ article }) => article === fields.article);
      newCartProducts[productIndex] = { ...newCartProducts[productIndex], quantity: newCartProducts[productIndex].quantity + 1 };
      store.dispatch(addProductToCart(fields.article, fields.productName, fields.price));

      expect(store.getState()).toMatchObject({ ...initialState, cartProducts: newCartProducts });
    });

    test('должен увеличивать количество продукта в cartProducts после события addProductToCart, вызванного для уже находящегося в store продукта', () => {
      const fields = {
        article: 3,
        productName: 'testProductName',
        price: 100
      };

      store.dispatch(addProductToCart(fields.article, fields.productName, fields.price));
      store.dispatch(addProductToCart(fields.article, fields.productName, fields.price));
      store.dispatch(addProductToCart(fields.article, fields.productName, fields.price));

      expect(store.getState()).toMatchObject({ ...initialState, cartProducts: [{ ...fields, quantity: 3 }, ...initialState.cartProducts] });
    });
  });

  describe('addAdditionToProductInCart', () => {
    test('должен не добавлять добавку если нет продукта', () => {
      const fields = {
        productArticle: 2,
        article: 10,
        productName: 'testProductName3',
        price: 1000
      };

      store.dispatch(addAdditionToProductInCart(fields.productArticle, fields.article, fields.productName, fields.price));

      expect(store.getState()).toMatchObject({ ...initialState });
    });

    test('должен добавлять новую добавку в продукт с уже существующими добавками', () => {
      const fields = {
        productArticle: 1,
        article: 333,
        productName: 'testProductName3',
        price: 1000
      };

      const newCartProducts = deepCopy(initialState.cartProducts);
      const productArticleIndex = newCartProducts.findIndex(({ article }) => article === fields.productArticle);
      const { article, productName, price } = fields;
      newCartProducts[productArticleIndex] = { ...newCartProducts[productArticleIndex], children: [{ article, productName, price, quantity: 1 }, ...newCartProducts[productArticleIndex].children] };

      store.dispatch(addAdditionToProductInCart(fields.productArticle, fields.article, fields.productName, fields.price));

      expect(store.getState()).toMatchObject({ ...initialState, cartProducts: [...newCartProducts] });
    });


    test('должен увеличивать количество добавки если она уже есть в продукте с уже существующими добавками', () => {
      const fields = {
        productArticle: 1,
        article: 10,
        productName: 'testProductName3',
        price: 1000
      };

      const newCartProducts = deepCopy(initialState.cartProducts);
      const productArticleIndex = newCartProducts.findIndex(({ article }) => article === fields.productArticle);
      const { article: fieldArticle } = fields;
      const additionArticleIndex = newCartProducts[productArticleIndex].children.findIndex(({ article }) => article === fieldArticle);
      newCartProducts[productArticleIndex].children[additionArticleIndex] = { ...newCartProducts[productArticleIndex].children[additionArticleIndex], quantity: newCartProducts[productArticleIndex].children[additionArticleIndex].quantity + 1 };

      store.dispatch(addAdditionToProductInCart(fields.productArticle, fields.article, fields.productName, fields.price));

      expect(store.getState()).toMatchObject({ ...initialState, cartProducts: [...newCartProducts] });
    });

    test('должен добавлять новую добавку в продукт без добавок', () => {
      const fields = {
        productArticle: 2,
        article: 333,
        productName: 'testProductName3',
        price: 1000
      };

      const newCartProducts = deepCopy(initialState.cartProducts);
      const productArticleIndex = newCartProducts.findIndex(({ article }) => article === fields.productArticle);
      const { article, productName, price } = fields;
      newCartProducts[productArticleIndex] = { ...newCartProducts[productArticleIndex], children: [{ article, productName, price, quantity: 1 }] };

      store.dispatch(addAdditionToProductInCart(fields.productArticle, fields.article, fields.productName, fields.price));

      expect(store.getState()).toMatchObject({ ...initialState, cartProducts: [...newCartProducts] });
    });
  });

  describe('incrementQuantityOfProductInCart', () => {
    test('должен не увеличивать количество продукта если нет такого продукта на событие incrementQuantityOfProductInCart', () => {

      store.dispatch(incrementQuantityOfProductInCart(1234));

      expect(store.getState()).toMatchObject({ ...initialState });
    });

    test('должен увеличивать количество продукта если продукт есть на событие incrementQuantityOfProductInCart', () => {
      const newState = deepCopy(initialState);
      newState.cartProducts.forEach((item, idx) => {
        if (item.article === 1 || item.article === 2) {
          newState.cartProducts[idx].quantity += 2;
        }
      });
      store.dispatch(incrementQuantityOfProductInCart(1));
      store.dispatch(incrementQuantityOfProductInCart(2));
      store.dispatch(incrementQuantityOfProductInCart(2));
      store.dispatch(incrementQuantityOfProductInCart(1));

      expect(store.getState()).toMatchObject({ ...newState });
    });
  });

  describe('decrementQuantityOfProductInCart', () => {
    test('должен не изменять количество продукта если нет такого продукта на событие decrementQuantityOfProductInCart', () => {

      store.dispatch(decrementQuantityOfProductInCart(1234));

      expect(store.getState()).toMatchObject({ ...initialState });
    });

    test('должен уменьшать количество продукта если продукт есть на событие decrementQuantityOfProductInCart', () => {
      const newState = deepCopy(initialState);
      newState.cartProducts.forEach((item, idx) => {
        if (item.article === 1 || item.article === 2) {
          newState.cartProducts[idx].quantity -= 2;
        }
      });
      store.dispatch(decrementQuantityOfProductInCart(1));
      store.dispatch(decrementQuantityOfProductInCart(2));
      store.dispatch(decrementQuantityOfProductInCart(2));
      store.dispatch(decrementQuantityOfProductInCart(1));

      expect(store.getState()).toMatchObject({ ...newState });
    });

    test('должен удалять продукт если кол-во стало равно нулю на событие decrementQuantityOfProductInCart', () => {
      const newState = deepCopy(initialState);
      newState.cartProducts = newState.cartProducts.filter(({ article }) => article !== 12);
      store.dispatch(decrementQuantityOfProductInCart(12));
      store.dispatch(decrementQuantityOfProductInCart(12));
      store.dispatch(decrementQuantityOfProductInCart(12));
      store.dispatch(decrementQuantityOfProductInCart(12));

      expect(store.getState()).toMatchObject({ ...newState });
    });
  });

  describe('incrementQuantityOfAdditionOfProduct', () => {
    test('должен ничего не делать если нет такого продукта', () => {
      store.dispatch(incrementQuantityOfAdditionOfProduct(123456, 12334));

      expect(store.getState()).toMatchObject({ ...initialState });
    });

    test('должен ничего не делать если такой добавки нет на продукте', () => {
      store.dispatch(incrementQuantityOfAdditionOfProduct(1, 12334));

      expect(store.getState()).toMatchObject({ ...initialState });
    });

    test('должен увеличивать на единицу количество добавки', () => {
      const newState = deepCopy(initialState);
      const productIndex = newState.cartProducts.findIndex(({ article }) => article === 1);
      const additionIndex = newState.cartProducts[productIndex].children.findIndex(({ article }) => article === 110);
      const oldQuantity = newState.cartProducts[productIndex].children[additionIndex].quantity;
      newState.cartProducts[productIndex].children[additionIndex].quantity = oldQuantity + 1;

      store.dispatch(incrementQuantityOfAdditionOfProduct(1, 110));

      expect(store.getState()).toMatchObject({ ...newState });
    });

    test('должен увеличивать на 2 количество добавки', () => {
      const newState = deepCopy(initialState);
      const productIndex = newState.cartProducts.findIndex(({ article }) => article === 1);
      const additionIndex = newState.cartProducts[productIndex].children.findIndex(({ article }) => article === 110);
      const oldQuantity = newState.cartProducts[productIndex].children[additionIndex].quantity;
      newState.cartProducts[productIndex].children[additionIndex].quantity = oldQuantity + 3;

      store.dispatch(incrementQuantityOfAdditionOfProduct(1, 110));
      store.dispatch(incrementQuantityOfAdditionOfProduct(1, 110));
      store.dispatch(incrementQuantityOfAdditionOfProduct(1, 110));

      expect(store.getState()).toMatchObject({ ...newState });
    });
  });

  describe('decrementQuantityOfAdditionOfProduct', () => {
    test('должен ничего не делать если нет такого продукта', () => {
      store.dispatch(decrementQuantityOfAdditionOfProduct(123456, 12334));

      expect(store.getState()).toMatchObject({ ...initialState });
    });

    test('должен ничего не делать если такой добавки нет на продукте', () => {
      store.dispatch(decrementQuantityOfAdditionOfProduct(1, 12334));

      expect(store.getState()).toMatchObject({ ...initialState });
    });

    test('должен уменьшать на единицу количество добавки', () => {
      const newState = deepCopy(initialState);
      const productIndex = newState.cartProducts.findIndex(({ article }) => article === 1);
      const additionIndex = newState.cartProducts[productIndex].children.findIndex(({ article }) => article === 110);
      const oldQuantity = newState.cartProducts[productIndex].children[additionIndex].quantity;
      newState.cartProducts[productIndex].children[additionIndex].quantity = oldQuantity - 1;

      store.dispatch(decrementQuantityOfAdditionOfProduct(1, 110));

      expect(store.getState()).toMatchObject({ ...newState });
    });

    test('должен уменьшать на 3 количество добавки', () => {
      const newState = deepCopy(initialState);
      const productIndex = newState.cartProducts.findIndex(({ article }) => article === 1);
      const additionIndex = newState.cartProducts[productIndex].children.findIndex(({ article }) => article === 110);
      const oldQuantity = newState.cartProducts[productIndex].children[additionIndex].quantity;
      newState.cartProducts[productIndex].children[additionIndex].quantity = oldQuantity - 2;

      store.dispatch(decrementQuantityOfAdditionOfProduct(1, 110));
      store.dispatch(decrementQuantityOfAdditionOfProduct(1, 110));

      expect(store.getState()).toMatchObject({ ...newState });
    });

    test('должен удалять добавку', () => {
      const newState = deepCopy(initialState);
      const productIndex = newState.cartProducts.findIndex(({ article }) => article === 1);
      const additionIndex = newState.cartProducts[productIndex].children.findIndex(({ article }) => article === 110);
      newState.cartProducts[productIndex].children.splice(additionIndex, 1);

      store.dispatch(decrementQuantityOfAdditionOfProduct(1, 110));
      store.dispatch(decrementQuantityOfAdditionOfProduct(1, 110));
      store.dispatch(decrementQuantityOfAdditionOfProduct(1, 110));
      store.dispatch(decrementQuantityOfAdditionOfProduct(1, 110));

      expect(store.getState()).toMatchObject({ ...newState });
    });
  });

  describe('deleteProductFromCart', () => {
    test('должен не удалять продукт', () => {
      store.dispatch(deleteProductFromCart(1234));

      expect(store.getState()).toMatchObject({ ...initialState });
    });

    test('должен удалять продукт', () => {
      const newState = deepCopy(initialState);
      newState.cartProducts = newState.cartProducts.filter(({ article }) => article !== 2);

      store.dispatch(deleteProductFromCart(2));

      expect(store.getState()).toMatchObject({ ...newState });
    });
  });

  describe('deleteAdditionOfProductFromCart', () => {
    test('должен не удалять добавку если нет продукта', () => {
      store.dispatch(deleteAdditionOfProductFromCart(1234, 10));

      expect(store.getState()).toMatchObject({ ...initialState });
    });

    test('должен не удалять добавку если есть продукт, но нет добавки', () => {
      store.dispatch(deleteAdditionOfProductFromCart(1, 11));
      store.dispatch(deleteAdditionOfProductFromCart(110, 11));

      expect(store.getState()).toMatchObject({ ...initialState });
    });

    test('должен удалять добавку', () => {
      const newState = deepCopy(initialState);
      const productIndex = newState.cartProducts.findIndex(({ article }) => article === 12);
      newState.cartProducts[productIndex].children = newState.cartProducts[productIndex].children.filter(({ article }) => article !== 10);

      store.dispatch(deleteAdditionOfProductFromCart(12, 10));

      expect(store.getState()).toMatchObject({ ...newState });
    });
  });
});
