import { User } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/user/models';
import { createAction } from '@reduxjs/toolkit';
import { AuthState } from './model';

enum AuthAction {
  runAuthFlow = '@auth/RUN_AUTHENTICATED_FLOW',
  updateMyProfile = '@auth/UPDATE_MY_PROFILE',
  getProfile = '@auth/getProfile',
  setLogged = '@auth/setLogged',
  setIgnoreRedirect = '@auth/setIgnoreRedirect',
}

const runAuthenticatedFlow = createAction<User>(AuthAction.runAuthFlow);
const updateMyProfile = createAction<User>(AuthAction.updateMyProfile);
const getMyProfile = createAction(AuthAction.getProfile);
const setLogged = createAction<AuthState['isLogged']>(AuthAction.setLogged);
const setIgnoreRedirect = createAction<AuthState['ignoreRedirect']>(AuthAction.setIgnoreRedirect);

export const authAction = {
  runAuthenticatedFlow,
  updateMyProfile,
  getMyProfile,
  setLogged,
  setIgnoreRedirect,
};
