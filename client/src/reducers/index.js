import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const defaultState = {
  session: !!localStorage.auth_token,
  user: (JSON.parse(localStorage.user || '{}')),
  donations: [],
  form: {
    register: {},
    login: {},
    updateUser: {},
    donate: {}
  }
};

const user = (state = defaultState.user, action) => {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return {...defaultState.user, ...action.payload };
    case types.SIGN_OUT_USER:
      return defaultState.user;
    case types.USER_UPDATED:
      return {...state, ...action.payload.user };
    case types.DONATION_SUCCESS:
      return {...state, ...action.payload };
    default:
      return state;
  }
};

const donations = (state = defaultState.donations, action) => {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return action.payload.donations;
    case types.DONATION_SUCCESS:
      return [...state, action.payload.donation ];
    case types.DONATIONS_RETRIEVED:
      return action.payload;
    default:
      return state;
  }
};

const session = (state = defaultState.session, action) => {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return !!localStorage.auth_token;
    case types.SIGN_OUT_USER:
      return !!localStorage.auth_token;
    default:
      return state;
  }
};

const form = (state = defaultState.form, action) => {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return defaultState.form;
    case types.LOGIN_FAIL:
      return { ...state, login: { ...action.payload } };
    case types.REGISTER_SUCCESS:
      return { ...state, register: { ...action.payload } };
    case types.REGISTER_FAIL:
      return { ...state, register: { ...action.payload } };
    case types.USER_UPDATED:
      return { ...state, updateUser: { ...action.payload } };
    case types.USER_UPDATE_FAIL:
      return { ...state, updateUser: { ...action.payload } };
    case types.DONATION_FAIL:
      return { ...state, donate: { ...action.payload } };
    case types.DONATION_SUCCESS:
      return { ...state, donate: { ...action.payload } };
    case types.CLEAR_FORM:
      return { ...state, [action.payload]: {} };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  session,
  user,
  donations,
  form,
  routing
});

export default rootReducer;
