import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the task state domain
 */

const selectTaskDomain = state => state.task || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Task
 */

const makeSelectTask = () =>
  createSelector(
    selectTaskDomain,
    substate => substate,
  );

export default makeSelectTask;
export { selectTaskDomain };
