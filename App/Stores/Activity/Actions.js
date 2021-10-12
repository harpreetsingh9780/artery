import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  activity: null,
  activityLoading: null,
  activitySuccess: ['items'],
  activityFailure: ['error'],
});

export const ActivityTypes = Types;
export const ActivityActions = Creators;
