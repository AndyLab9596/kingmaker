import { createAction } from '@reduxjs/toolkit';
import { UsState } from './model';

enum USStateType {
  getUSState = '@USStateType/getUSState',
  setUSState = '@USStateType/setUSState',
}

const getUSState = createAction(USStateType.getUSState);
const setUSState = createAction<UsState['usState']>(USStateType.setUSState);

export const usStateAction = {
  getUSState,
  setUSState,
};
