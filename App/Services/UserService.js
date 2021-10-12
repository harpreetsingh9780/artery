import { HttpClient } from './HttpClient';

function getUserUsingHandle(handle) {
  return HttpClient.get('/api/v1/users/by-handle', { params: { handle } }).then(
    (response) => response.user
  );
}

function searchUsers({ query }, options = {}) {
  return HttpClient.get('/api/v1/users/search', { ...options, ...{ params: { query } } });
}

function getRecent(options) {
  return HttpClient.get('/api/v1/users/recent', options);
}

export const UserService = {
  getUserUsingHandle,
  searchUsers,
  getRecent,
};
