import { changeLanguageType, addUserType, logoutUserType } from './actionsTypes';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const ADD_USER = 'ADD_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const formDataActions = {
  ADD_TO_FORM_DATA: 'ADD_TO_FORM_DATA',
  UPDATE_ALL_FIELDS: 'UPDATE_ALL_FIELDS',
  CLEAR_ALL_FIELDS: 'CLEAR_ALL_FIELDS'
};

export const changeLanguage: changeLanguageType = (lang) => ({ type: CHANGE_LANGUAGE, lang });

export const addUser: addUserType = (role, code) => ({ type: ADD_USER, role, code });

export const logoutUser: logoutUserType = () => ({ type: LOGOUT_USER });
