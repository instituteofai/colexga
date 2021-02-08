import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectGlobalNotification = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.notification,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export { selectGlobal, makeSelectLocation, makeSelectGlobalNotification };
