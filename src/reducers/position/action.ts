import { createAction } from '@reduxjs/toolkit';
import { PositionState } from './model';

enum PositionType {
  getGovernmentLevel = '@PositionType/getGovernmentLevel',
  setGovernmentLevel = '@PositionType/setGovernmentLevel',
  getRace = '@PositionType/getRace',
  setRace = '@PositionType/setRace',
  getJurisdiction = '@PositionType/getJurisdiction',
  setJurisdiction = '@PositionType/setJurisdiction',
  getPositions = '@PositionType/getPositions',
  setPositions = '@PositionType/setPositions',
}

const getGovernmentLevel = createAction(PositionType.getGovernmentLevel);
const setGovernmentLevel = createAction<PositionState['governmentLevel']>(PositionType.setGovernmentLevel);

const getRace = createAction<string>(PositionType.getRace);
const setRace = createAction<PositionState['race']>(PositionType.setRace);

const getJurisdiction = createAction<string>(PositionType.getJurisdiction);
const setJurisdiction = createAction<PositionState['jurisdiction']>(PositionType.setJurisdiction);

const getPositions = createAction<string>(PositionType.getPositions);
const setPositions = createAction<PositionState['position']>(PositionType.setPositions);

export const positionAction = {
  getGovernmentLevel,
  setGovernmentLevel,

  getRace,
  setRace,

  getJurisdiction,
  setJurisdiction,

  getPositions,
  setPositions,
};
