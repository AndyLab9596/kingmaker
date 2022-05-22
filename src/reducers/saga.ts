import { fork } from 'redux-saga/effects';
import authSaga from './auth/saga';
import dashboardSaga from './dashboard/saga';
import positionSaga from './position/saga';
import socketSaga from './socket/saga';
import usStateSaga from './state/saga';

function* rootSaga() {
  yield fork(authSaga);
  yield fork(socketSaga);
  yield fork(positionSaga);
  yield fork(usStateSaga);
  yield fork(dashboardSaga);
  //   ....
}

export { rootSaga };
