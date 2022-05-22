import { createReducer } from '@reduxjs/toolkit';
import { usStateAction } from './action';
import { UsState } from './model';

const initialState: UsState = {
  usState: [],
};
const usStateReducer = createReducer(initialState, (builder) =>
  builder.addCase(usStateAction.setUSState, (state, action) => {
    state.usState = action.payload;
  }),
);

export default usStateReducer;
