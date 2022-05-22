import { createReducer } from '@reduxjs/toolkit';
import { AuthState } from 'src/reducers/auth/model';
import { authAction } from './action';

const initialState: AuthState = {
  isLogged: null,
  ignoreRedirect: false,
};

const authReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(authAction.runAuthenticatedFlow, (state, action) => {
      state.myProfile = action.payload;
    })
    .addCase(authAction.updateMyProfile, (state, action) => {
      state.myProfile = action.payload;
    })
    .addCase(authAction.setLogged, (state, action) => {
      state.isLogged = action.payload;
    })
    .addCase(authAction.setIgnoreRedirect, (state, action) => {
      state.ignoreRedirect = action.payload;
    }),
);

export default authReducer;
