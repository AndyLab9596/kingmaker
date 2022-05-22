import { createAction } from '@reduxjs/toolkit';
import { AppState } from './model';

enum AppAction {
  appLoading = '@app/appLoading',
  resetRootState = '@app/resetRootState',
  setTheme = '@app/setTheme',
  showLoading = '@app/showLoading',
  hideLoading = '@app/hideLoading',
}

const appLoading = createAction<AppState['loading']>(AppAction.appLoading);
const setTheme = createAction<AppState['theme']>(AppAction.setTheme);
const showLoading = createAction(AppAction.showLoading);
const hideLoading = createAction(AppAction.hideLoading);

export const appAction = {
  appLoading,
  setTheme,
  showLoading,
  hideLoading,
};
