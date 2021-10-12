import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { PHONE_NUMBER_COUNTRY } from './Constants';

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

export const isStringValid = (value) =>
  !(value === null || typeof value === 'undefined' || !value.length);

export const isEmailValid = (value) => EMAIL_REGEX.test(String(value).toLowerCase());

export const isPasswordValid = (value) =>
  PASSWORD_REGEX.test(String(value)) && String(value).length >= 8;

export const isPhoneValid = (value) =>
  parsePhoneNumberFromString(value, PHONE_NUMBER_COUNTRY)?.isPossible() || false;
