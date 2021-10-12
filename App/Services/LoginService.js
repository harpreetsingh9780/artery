import { parsePhoneNumber } from 'libphonenumber-js';
import { HttpClient } from './HttpClient';
import { PHONE_NUMBER_COUNTRY } from '../Utils/Constants';

function login(email, password) {
  return HttpClient.post('/api/v1/users/sign-in', { email, password });
}

function startPhoneVerify({ email, phone }) {
  const { countryCallingCode, nationalNumber } = parsePhoneNumber(phone, PHONE_NUMBER_COUNTRY);
  return HttpClient.post('/api/v1/phone/verify/start', {
    email,
    phone: nationalNumber,
    phoneCountryCode: countryCallingCode,
  });
}

function finishPhoneVerify({ verificationId, verificationCode }) {
  return HttpClient.post('/api/v1/phone/verify', {
    verificationId,
    verificationCode,
  });
}

function createAccount({
  verificationId,
  verificationCode,
  email,
  phone,
  firstName,
  lastName,
  password,
  merchant,
  merchantLegalName,
  merchantDba,
  birthEpochDate,
  licenseNumber,
  streetAddress1,
  streetAddress2,
  city,
  state,
  postalCode,
  countryCode,
}) {
  const { countryCallingCode, nationalNumber } = parsePhoneNumber(phone, PHONE_NUMBER_COUNTRY);
  return HttpClient.post('/api/v1/users/sign-up', {
    verificationId,
    verificationCode,
    email,
    phone: nationalNumber,
    phoneCountryCode: countryCallingCode,
    firstName,
    lastName,
    password,
    merchant,
    merchantLegalName,
    merchantDba,
    birthEpochDate,
    licenseNumber,
    streetAddress1,
    streetAddress2,
    city,
    state,
    postalCode,
    countryCode,
  });
}

function parseDriversLicense({ data }) {
  return HttpClient.post('/api/v1/parse-drivers-license', {
    data,
  });
}

export const LoginService = {
  login,
  startPhoneVerify,
  finishPhoneVerify,
  createAccount,
  parseDriversLicense,
};
