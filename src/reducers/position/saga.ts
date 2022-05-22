import { Jurisdiction, Position } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/location/models';
import { GovernmentLevel, Race } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/user/models';
import { PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { call, put, takeLatest } from 'redux-saga/effects';
import { apiIns } from 'src/config/apiClient';
import { positionAction } from './action';

function* implementGetGovernmentLevel() {
  try {
    const response: GovernmentLevel[] = yield call([apiIns.user, apiIns.user.getGovernmentLevel]);
    yield put(positionAction.setGovernmentLevel(response));
  } catch (error: any) {
    message.error(error.message);
  }
}

function* implementGetJurisdiction(action: PayloadAction<string>) {
  try {
    const response: Array<Jurisdiction> = yield call(
      [apiIns.location, apiIns.location.getJurisdictions],
      action.payload,
    );
    yield put(positionAction.setJurisdiction(response));
  } catch (error: any) {
    message.error(error.message);
  }
}

function* implementGetRace(action: PayloadAction<string>) {
  try {
    const response: Array<Race> = yield call([apiIns.location, apiIns.user.getRace], action.payload);
    yield put(positionAction.setRace(response));
  } catch (error: any) {
    message.error(error.message);
  }
}

function* implementGetPosition(action: PayloadAction<string>) {
  try {
    const response: Array<Position> = yield call([apiIns.location, apiIns.location.getPositions], action.payload);
    yield put(positionAction.setPositions(response));
  } catch (error: any) {
    message.error(error.message);
  }
}

function* positionSaga() {
  yield takeLatest(positionAction.getGovernmentLevel, implementGetGovernmentLevel);
  yield takeLatest(positionAction.getJurisdiction, implementGetJurisdiction);
  yield takeLatest(positionAction.getRace, implementGetRace);
  yield takeLatest(positionAction.getPositions, implementGetPosition);
}

export default positionSaga;
