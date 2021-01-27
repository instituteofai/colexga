import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the task state domain
 */

const selectTaskDomain = state => state.task || initialState;

/**
 * Other specific selectors
 */

const makeSelectLoading = () =>
  createSelector(
    selectTaskDomain,
    taskState => taskState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectTaskDomain,
    taskState => taskState.error,
  );

const makeSelectTask = () =>
  createSelector(
    selectTaskDomain,
    taskState => taskState.task,
  );

export default makeSelectTask;
export { selectTaskDomain, makeSelectLoading, makeSelectError, makeSelectTask };
