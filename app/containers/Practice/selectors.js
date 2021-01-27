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

const makeSelectLoading = () =>
  createSelector(
    selectPracticeDomain,
    practiceState => practiceState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectPracticeDomain,
    practiceState => practiceState.error,
  );

const makeSelectTests = () =>
  createSelector(
    selectPracticeDomain,
    practiceState => practiceState.tests,
  );

export default makeSelectPractice;
export {
  selectPracticeDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectTests,
};
