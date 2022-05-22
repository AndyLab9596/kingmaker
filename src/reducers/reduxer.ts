import { combineReducers } from '@reduxjs/toolkit';
import app from 'src/reducers/app/reducer';
import auth from 'src/reducers/auth/reducer';
import socket from 'src/reducers/socket/reducer';
import user from 'src/reducers/user/reducer';
import position from './position/reducer';
import usState from './state/reducer';
import dashboard from './dashboard/reducer';

export const rootReducer = (injectedReducers = {}) => {
  return combineReducers({
    app,
    auth,
    socket,
    user,
    position,
    usState,
    dashboard,
    ...injectedReducers,
  });
};
