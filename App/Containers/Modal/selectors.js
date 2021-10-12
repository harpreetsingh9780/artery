import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the modal state domain
 */

const selectModalDomain = state => state.modal || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Modal
 */

const makeSelectModal = () =>
  createSelector(
    selectModalDomain,
    substate => substate,
  );

export default makeSelectModal;
export { selectModalDomain };
