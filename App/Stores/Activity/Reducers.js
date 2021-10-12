import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { ActivityTypes } from './Actions';

export const activityLoading = (state) => ({
  ...state,
  activityLoading: true,
  activityError: null,
});

export const activitySuccess = (state, { items }) => ({
  ...state,
  activity: items,
  activityLoading: false,
  activityError: null,
});

export const activityFailure = (state, { error }) => ({
  ...state,
  activityLoading: false,
  activityError: error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [ActivityTypes.ACTIVITY]: activityLoading,
  [ActivityTypes.ACTIVITY_SUCCESS]: activitySuccess,
  [ActivityTypes.ACTIVITY_FAILURE]: activityFailure,
});
