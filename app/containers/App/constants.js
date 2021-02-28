/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SHOW_GLOBAL_NOTIFICATION = 'app/App/SHOW_GLOBAL_NOTIFICATION';
export const HIDE_GLOBAL_NOTIFICATION = 'app/App/HIDE_GLOBAL_NOTIFICATION';
export const UPDATE_USER = 'app/App/UPDATE_USER';
export const GET_USER = 'app/App/GET_USER';
export const LOAD_USER_SUBMISSIONS = 'app/App/LOAD_USER_SUBMISSIONS';
export const FETCH_USER_SUBMISSIONS = 'app/App/FETCH_USER_SUBMISSIONS';

export const notificationType = {
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  INFORMATION: 'INFORMATION',
};
