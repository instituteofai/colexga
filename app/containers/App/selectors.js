import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user,
  );

const makeSelectGlobalNotification = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.notification,
  );

const makeSelectUserSubmissions = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userSubmissions,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export {
  selectGlobal,
  makeSelectLocation,
  makeSelectGlobalNotification,
  makeSelectUser,
  makeSelectUserSubmissions,
};
