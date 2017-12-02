const validator = require('validator');

exports.validateDonationForm = (payload = {}) => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (typeof payload.organization !== 'string' || payload.organization === '') {
    isFormValid = false;
    errors.organization = 'Please provide a valid organization.';
  }

  if (typeof payload.amount !== 'string' || !validator.isInt(payload.amount)) {
    isFormValid = false;
    errors.amount = 'Please provide a valid amount.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

exports.validateEditProfileForm = (payload = {}) => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (typeof payload.email !== 'string' || payload.email.trim().length === 0 || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a valid email address.';
  }

  if (typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

exports.validateSignupForm = (payload = {}) => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

exports.validateLoginForm = (payload = {}) => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (typeof payload.email !== 'string' || payload.email.trim().length === 0 || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}
