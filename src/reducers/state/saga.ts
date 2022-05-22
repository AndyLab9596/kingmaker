import { USStates } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/location/models';
import { message } from 'antd';
import { call, put, takeLatest } from 'redux-saga/effects';
import { apiIns } from 'src/config/apiClient';
import { appAction } from '../app/action';
import { usStateAction } from './action';

function* implementGetState() {
  try {
    yield put(appAction.showLoading());
    const response: USStates[] = yield call([apiIns.location, apiIns.location.USStates]);
    yield put(usStateAction.setUSState(response));
  } catch (error: any) {
    message.error(error.message);
  } finally {
    yield put(appAction.hideLoading());
  }
}

function* usStateSaga() {
  yield takeLatest(usStateAction.getUSState.type, implementGetState);
}

export default usStateSaga;
