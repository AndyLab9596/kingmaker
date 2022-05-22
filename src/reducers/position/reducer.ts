import { createReducer } from '@reduxjs/toolkit';
import { positionAction } from './action';
import { PositionState } from './model';

const initialState: PositionState = {
  governmentLevel: [],
  race: [],
  jurisdiction: [],
  position: [],
};
const positionReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(positionAction.setGovernmentLevel, (state, action) => {
      state.governmentLevel = action.payload;
    })
    .addCase(positionAction.setJurisdiction, (state, action) => {
      state.jurisdiction = action.payload;
    })
    .addCase(positionAction.setRace, (state, action) => {
      state.race = action.payload;
    })
    .addCase(positionAction.setPositions, (state, action) => {
      state.position = action.payload;
    }),
);

export default positionReducer;
