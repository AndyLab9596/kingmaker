import { User } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/user/models';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, ForkEffect, put, select, takeLatest } from 'redux-saga/effects';
import { apiIns } from 'src/config/apiClient';
import { RootState } from '../model';
import SocketAction from '../socket/action';
import { authAction } from './action';

function* watchAuthenticateFlow(action: PayloadAction<any>) {
  yield put(authAction.updateMyProfile(action.payload));
  const isConnectedSocket = yield select((state: RootState) => state.socket.connected);
  if (!isConnectedSocket) {
    yield put({
      type: SocketAction.CONNECT_SOCKET,
    });
  }
}

function* implementGetProfile() {
  try {
    const profile: User = yield call([apiIns.user, apiIns.user.me]);
    yield put(authAction.runAuthenticatedFlow(profile));
    yield put(authAction.setLogged(true));
  } catch (error) {
    yield put(authAction.setLogged(false));
    localStorage.clear();
  }
}

function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(authAction.runAuthenticatedFlow.type, watchAuthenticateFlow);
  yield takeLatest(authAction.getMyProfile.type, implementGetProfile);
}

export default authSaga;
