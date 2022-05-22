import { createReducer } from '@reduxjs/toolkit';
import { appAction } from './action';
import { AppState } from './model';

const initialState: AppState = {
  loading: false,
  theme: 'light',
  countLoading: 0,
};

const appReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(appAction.appLoading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(appAction.setTheme, (state, action) => {
      state.theme = action.payload;
    })
    .addCase(appAction.showLoading, (state) => {
      state.countLoading++;
    })
    .addCase(appAction.hideLoading, (state) => {
      state.countLoading--;
    }),
);

export default appReducer;
