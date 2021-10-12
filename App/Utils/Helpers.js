import { AsYouType } from 'libphonenumber-js';
import { PHONE_NUMBER_COUNTRY } from './Constants';

export const convertCents = (amount) =>
  Number(amount / 100)
    .toFixed(2)
    .toLocaleString();

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const convertDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const day = getOrdinalNum(date.getDate());
  const month = date.getMonth();
  return `${monthNames[month]} ${day}, ${year}`;
};

export function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

export const convertDateLong = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const day = getOrdinalNum(date.getDate());
  const month = date.getMonth();
  return `${monthNames[month]} ${day}, ${year}, ${formatAMPM(date)}`;
};

export const nameOrHandle = (user) => {
  if (user.firstName || user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  return user?.handle || null;
};

export const getOrdinalNum = (number) => {
  let selector;

  if (number <= 0) {
    selector = 4;
  } else if ((number > 3 && number < 21) || number % 10 > 3) {
    selector = 0;
  } else {
    selector = number % 10;
  }

  return number + ['th', 'st', 'nd', 'rd', ''][selector];
};

export const ucFirst = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function getMinHeight() {
  return window.innerHeight;
}

export const stringifyPhoneNumber = (phone) => {
  try {
    return new AsYouType(PHONE_NUMBER_COUNTRY).input(phone);
  } catch (e) {
    return null;
  }
};

export function isJsonString(str) {
  try {
    const json = JSON.parse(str);
    return typeof json === 'object';
  } catch (e) {
    return false;
  }
}
