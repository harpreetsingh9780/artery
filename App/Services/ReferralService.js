import { HttpClient } from './HttpClient';

function invite(type, identifier) {
  return HttpClient.post('/api/v1/referrals', { type, identifier }).then((response) => response);
}

export const ReferralService = {
  invite,
};
