import { createAction } from '@reduxjs/toolkit';
import { Dashboard } from './model';

enum DashboardDataType {
  getDashboardData = '@DashboardType/getDashboardData',
  setDashboardData = '@DashboardType/setDashboardData',

  getDashboardMapData = '@DashboardType/getDashboardMapData',
  setDashboardMapData = '@DashboardType/setDashboardMapData',

  hideDashboardLoading = '@DashboardType/hideDashboardLoading',
  setDashboardFilterParams = '@DashboardType/setDashboardFilterParams',

  updateChartFilterParams = '@DashboardType/updateChartFilterParams',
  resetChartData = '@DashboardType/resetChartData',

  cancelSketch = '@DashboardType/cancelSketch',
  updateChart = '@DashboardType/updateChart',

  setFilterParam = '@DashboardType/setFilterParam',

  setIsFilterChartsByChart = '@DashboardType/setIsFilterChartsByChart',

  setIsClearFilter = '@DashboardType/setIsClearFilter',
}

const getDashboardData = createAction<Dashboard['dashboardFilterParams']>(DashboardDataType.getDashboardData);
const setDashboardData = createAction<Dashboard['dashboardChartData']>(DashboardDataType.setDashboardData);

const getDashboardMapData = createAction<Dashboard['dashboardMapData']>(DashboardDataType.getDashboardMapData);
const setDashboardMapData = createAction<Dashboard['dashboardMapData']>(DashboardDataType.setDashboardMapData);

const hideDashboardLoading = createAction(DashboardDataType.hideDashboardLoading);
const setDashboardFilterParams = createAction<Dashboard['dashboardFilterParams']>(
  DashboardDataType.setDashboardFilterParams,
);
const updateChartFilterParams = createAction<Dashboard['dashboardFilterParams']>(
  DashboardDataType.updateChartFilterParams,
);

const resetChartData = createAction(DashboardDataType.resetChartData);
const cancelSketch = createAction<Dashboard['dashboardFilterParams']>(DashboardDataType.cancelSketch);
const updateChart = createAction(DashboardDataType.updateChart);

const setFilterParam = createAction<Dashboard['filterParam']>(DashboardDataType.setFilterParam);

const setIsFilterChartsByChart = createAction<Dashboard['isFilterChartsByChart']>(
  DashboardDataType.setIsFilterChartsByChart,
);

const setIsClearFilter = createAction<Dashboard['isClearFilter']>(DashboardDataType.setIsClearFilter);

export const dashboardDataAction = {
  getDashboardData,
  setDashboardData,
  getDashboardMapData,
  setDashboardMapData,
  hideDashboardLoading,
  setDashboardFilterParams,
  updateChartFilterParams,
  resetChartData,
  cancelSketch,
  updateChart,
  setFilterParam,
  setIsFilterChartsByChart,
  setIsClearFilter,
};
