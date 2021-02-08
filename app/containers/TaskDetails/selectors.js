import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the taskDetails state domain
 */

const selectTaskDetailsDomain = state => state.taskDetails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TaskDetails
 */

const makeSelectTaskDetails = () =>
  createSelector(
    selectTaskDetailsDomain,
    substate => substate,
  );

export default makeSelectTaskDetails;
export { selectTaskDetailsDomain };
