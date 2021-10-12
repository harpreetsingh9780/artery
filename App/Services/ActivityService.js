import { HttpClient } from './HttpClient';

function getActivity() {
  return HttpClient.get('/api/v1/activity').then((response) => response.activity);
}

export const ActivityService = {
  getActivity,
};
