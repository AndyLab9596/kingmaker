import { DashboardChartData } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/dashboard/models';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { message } from 'antd';
import { parse } from 'query-string';
import { apiIns } from 'src/config/apiClient';
import { dashboardDataAction } from './action';
import { appAction } from 'src/reducers/app/action';

function* implementGetDashboardData(action) {
  try {
    yield put(appAction.showLoading);
    const response: DashboardChartData = yield call([apiIns.dashboard, apiIns.dashboard.queryChart], action.payload);
    yield put(dashboardDataAction.setDashboardData(response));
  } catch (error: any) {
    message.error(error.message);
  } finally {
    yield put(appAction.hideLoading);
    yield put(dashboardDataAction.hideDashboardLoading());
  }
}

function* implementGetDashboardMapData(action) {
  try {
    const { maps, params } = action.payload;

    yield put(appAction.showLoading);
    yield put(
      dashboardDataAction.setDashboardMapData({
        maps,
        loading: true,
      }),
    );
    const response = yield call([apiIns.dashboard, apiIns.dashboard.queryMaps], params);
    let cursor;
    if (response.next) {
      const data = parse(response.next);
      cursor = data.cursor;
    }

    yield put(
      dashboardDataAction.setDashboardMapData({
        maps: maps.concat(response.results),
        cursor,
        loading: false,
      }),
    );
  } catch (error: any) {
    message.error(error.message);
    yield put(
      dashboardDataAction.setDashboardMapData({
        maps: [],
        loading: false,
      }),
    );
  } finally {
    yield put(appAction.hideLoading);
    yield put(dashboardDataAction.hideDashboardLoading());
  }
}

function* implementCancelSketch(action) {
  const { params } = action.payload;
  try {
    yield put(dashboardDataAction.updateChart());
    const response: DashboardChartData = yield call([apiIns.dashboard, apiIns.dashboard.queryChart], params);
    yield put(dashboardDataAction.setDashboardData(response));
  } catch (error: any) {
    message.error(error.message);
  } finally {
    yield put(dashboardDataAction.hideDashboardLoading());
  }
}

function* dashboardSaga() {
  yield takeLatest(dashboardDataAction.getDashboardData.type, implementGetDashboardData);
  yield takeLatest(dashboardDataAction.getDashboardMapData.type, implementGetDashboardMapData);
  yield takeLatest(dashboardDataAction.cancelSketch.type, implementCancelSketch);
}

export default dashboardSaga;
