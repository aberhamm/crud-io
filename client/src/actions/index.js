import Api from '../lib/api';
import * as types from './types';

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload
  };
}

export function loginFail(payload) {
  return {
    type: types.LOGIN_FAIL,
    payload
  };
}

export function registerSuccess(payload) {
  return {
    type: types.REGISTER_SUCCESS,
    payload
  };
}

export function registerFail(payload) {
  return {
    type: types.REGISTER_FAIL,
    payload
  };
}

export function signOutUser() {
  localStorage.clear();
  return {
    type: types.SIGN_OUT_USER
  };
}

export function userUpdated(payload) {
  return {
    type: types.USER_UPDATED,
    payload
  };
}

export function userUpdateFail(payload) {
  return {
    type: types.USER_UPDATE_FAIL,
    payload
  };
}
export function donationSuccess(payload) {
  return {
    type: types.DONATION_SUCCESS,
    payload
  };
}

export function donationFail(payload) {
  return {
    type: types.DONATION_FAIL,
    payload
  };
}

export function donationsRetrieved(payload) {
  return {
    type: types.DONATIONS_RETRIEVED,
    payload
  };
}

export function loginUser({email, password}) {
  return (dispatch) => {
    Api.login({email, password}).then(resp => {
      if (resp.success) {
        localStorage.setItem('auth_token', resp.token);
        localStorage.setItem('user', JSON.stringify(resp.user));
        dispatch(loginSuccess(resp.user));
      } else {
        dispatch(loginFail(resp));
      }
    })
    .catch(err => dispatch(loginFail(err)));
  };
}

export function registerUser(user) {
  return (dispatch) => {
    Api.register(user).then(resp => {
      if (resp.success) {
        console.log({resp});
      } else {
        dispatch(registerFail(resp));
      }
    })
    .catch(err => dispatch(loginFail(err)));
  };
}

export function getDashboard() {
  return dispatch => {
    Api.getDashboard().then(resp => {
      console.log(resp);
    })
    .catch(err => {
      // TODO: handle errors
      console.log(err);
    });
  };
}

export function updateCurrentUser(user) {
  return (dispatch) => {
    Api.putUser(user).then(resp => {
      if (resp.success) {
        const cachedUser = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify({...cachedUser, ...resp.user}));
        dispatch(userUpdated(resp.user));
      } else {
        dispatch(userUpdateFail(resp));
      }
    })
    .catch(err => {
      // TODO: handle errors
      console.log(err);
    });
  };
}

export function createDonation(donation) {
  return (dispatch) => {
    Api.postDonation(donation).then(resp => {
      if (resp.success) {
        dispatch(donationSuccess(resp.donation));
      } else {
        dispatch(donationFail(resp));
      }
    })
    .catch(err => {
      // TODO: handle errors
      console.log(err);
    });
  };
}

export function retrieveUserDonations(userId) {
  return (dispatch) => {
    Api.getUserDonations(userId).then(resp => {
      dispatch(donationsRetrieved(resp));
    })
    .catch(err => {
      // TODO: handle errors
      console.log(err);
    });
  };
}

export function retrieveAllDonations() {
  return (dispatch) => {
    Api.getAllDonations().then(resp => {
      dispatch(donationsRetrieved(resp));
    })
    .catch(err => {
      // TODO: handle errors
      console.log(err);
    });
  };
}
