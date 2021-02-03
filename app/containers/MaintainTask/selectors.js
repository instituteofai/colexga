import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the maintainTask state domain
 */

const selectMaintainTaskDomain = state => state.maintainTask || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MaintainTask
 */

const makeSelectMaintainTask = () =>
  createSelector(
    selectMaintainTaskDomain,
    substate => substate,
  );

export default makeSelectMaintainTask;
export { selectMaintainTaskDomain };
