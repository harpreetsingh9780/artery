import { HttpClient } from './HttpClient';

function balance(tokenId) {
  return HttpClient.get('/api/v1/balance', { params: { tokenId } }).then((response) => response);
}

function transactionRequests(options = {}) {
  return HttpClient.get('/api/v1/transaction-requests', options).then(
    (response) => response.requests
  );
}

export const BalanceService = {
  balance,
  transactionRequests,
};
