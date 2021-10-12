import { HttpClient } from './HttpClient';

function getLinkedBanks(tokenId) {
  return HttpClient.get('/api/v1/users/all-bank-accounts', { params: { tokenId } }).then(
    (response) => response.bankAccounts
  );
}

function purchaseTokens({ amount, tokenId, sourceId, paymentProcessorId }) {
  return HttpClient.post('/api/v1/purchase-tokens', {
    amount: Number(amount) * 100,
    tokenId,
    sourceId,
    paymentProcessorId,
  }).then((response) => response);
}

function requestMoney(requesteeUserId, amount, invoiceReference) {
  return HttpClient.post('/api/v1/transaction-requests', {
    requesteeUserId,
    amount: Number(amount) * 100,
    invoiceReference,
  });
}

function getBankAccConfig() {
  return HttpClient.get('/api/v1/users/bank-accounts/config');
}

function getFrogHtml() {
  return HttpClient.get('/api/v1/follow-the-frog-widget');
}

function followFrog({
  paymentProcessorId,
  accountToken
}){
  return HttpClient.post('/api/v1/users/bank-accounts/follow-the-frog', {
    paymentProcessorId,
    accountToken
  });
}

function sendMoney({
  receiverUserId,
  amount,
  requestId,
  fundingSourceId,
  fundingPaymentProcessorId,
  tokenId,
}) {
  return HttpClient.post('/api/v1/send', {
    receiverUserId,
    amount: Number(amount) * 100,
    requestId,
    fundingSourceId,
    fundingPaymentProcessorId,
    tokenId,
  });
}

function purchase({
  receiverUserId,
  amount,
  // externalPurchaseId,
  clientPurchaseId,
  fundingSourceId,
  fundingPaymentProcessorId,
  // tokenId,   //  Will uncomment in future
  receiptItems,
  tipAmount
}) {
  return HttpClient.post('/api/v1/purchase', {
    receiverUserId,
    amount: Number(amount),
    // externalPurchaseId,
    clientPurchaseId,
    fundingSourceId,
    fundingPaymentProcessorId,
    // tokenId,   //  Will uncomment in future
    receiptItems,
    tipAmount
  });
}

export const BanksService = {
  getLinkedBanks,
  purchaseTokens,
  requestMoney,
  getFrogHtml,
  sendMoney,
  purchase,
  getBankAccConfig,
  followFrog
};
