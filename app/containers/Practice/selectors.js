import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the practice state domain
 */

const selectPracticeDomain = state => state.practice || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Practice
 */

const makeSelectPractice = () =>
  createSelector(
    selectPracticeDomain,
    substate => substate,
  );

export default makeSelectPractice;
export { selectPracticeDomain };
