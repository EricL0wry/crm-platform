import * as EmailValidator from 'email-validator';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export const phoneNumberFormater = number => {
  const num = phoneUtil.parseAndKeepRawInput(number, 'US');
  return phoneUtil.formatInOriginalFormat(num, 'US');
};

export const isValidPhoneNumber = number => {
  const num = phoneUtil.parseAndKeepRawInput(number, 'US');
  return phoneUtil.isValidNumber(num);
};

export const isValidEmail = email => {
  return EmailValidator.validate(email);
};
