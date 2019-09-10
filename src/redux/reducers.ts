import { CHANGE_LANGUAGE, ADD_USER, LOGOUT_USER, formDataActions } from './actions';

import fieldNames from '../constants/fieldNames';
import { selectValues } from '../constants/selectValues';

import {
  LanguagesState,
  LanguageAction,
  UserState,
  UserAction,
  FormDataStateType,
  FormDataStateAction
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
