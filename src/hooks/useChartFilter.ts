import { ActiveElement, ChartEvent } from 'chart.js';
import { useState, useMemo } from 'react';
import { dashboardDataAction } from 'src/reducers/dashboard/action';
import { ChartDataType } from 'src/reducers/dashboard/model';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';
import { addRandomColors } from 'src/utils/common';

export const useChartFilter = (chartData: ChartDataType, filterParams: string, arrayColor: string[]) => {
  const dispatch = useAppDispatch();
  const isClearFilter = useAppSelector((state) => state.dashboard.isClearFilter);
  const dashboardFilterParams = useAppSelector((state) => state.dashboard.dashboardFilterParams);
  const [activeItem, setActiveItem] = useState<null | string>(null);

  const onClick = (event: ChartEvent, elements: ActiveElement[], filterParam: string, data?: ChartDataType | null) => {
    if (elements.length === 0) return;
    const activeEl = chartData?.label[elements[0].index] as string;
    const active = activeEl === activeItem;
    if (data) {
      dispatch(
        dashboardDataAction.setFilterParam({
          name: filterParam,
          data,
        }),
      );
    }
    dispatch(dashboardDataAction.setIsClearFilter(false));
    if (active) {
      setActiveItem(null);
      dispatch(
        dashboardDataAction.setDashboardFilterParams({
          ...dashboardFilterParams,
          [filterParams]: '',
        }),
      );
    } else {
      setActiveItem(activeEl);
      if (filterParams === 'est_party') {
        dispatch(
          dashboardDataAction.setDashboardFilterParams({
            ...dashboardFilterParams,
            est_party:
              chartData?.label[elements[0].index] === 'Republican'
                ? 'Likely Republican'
                : chartData?.label[elements[0].index] === 'Democratic'
                ? 'Likely Democratic'
                : 'Likely Independent',
          }),
        );
      } else {
        dispatch(
          dashboardDataAction.setDashboardFilterParams({
            ...dashboardFilterParams,
            [filterParams]: chartData?.label[elements[0].index],
          }),
        );
      }
    }
  };

  const onChartClick = (clickedIndex: number, data: ChartDataType, filterParam?: string) => {
    const activeEl = chartData?.label[clickedIndex] as string;
    const active = activeEl === activeItem;
    if (filterParam) {
      dispatch(
        dashboardDataAction.setFilterParam({
          name: filterParam,
          data,
        }),
      );
    }
    dispatch(dashboardDataAction.setIsClearFilter(false));
    if (active) {
      setActiveItem(null);
      if (filterParams === 'voted') {
        dispatch(
          dashboardDataAction.setDashboardFilterParams({
            ...dashboardFilterParams,
            voted: undefined,
          }),
        );
      }
      dispatch(
        dashboardDataAction.setDashboardFilterParams({
          ...dashboardFilterParams,
          [filterParams]: '',
        }),
      );
    } else {
      setActiveItem(activeEl);
      if (filterParams === 'voted') {
        dispatch(
          dashboardDataAction.setDashboardFilterParams({
            ...dashboardFilterParams,
            voted: chartData?.label[clickedIndex] === 'Voted' ? true : false,
          }),
        );
      } else {
        dispatch(
          dashboardDataAction.setDashboardFilterParams({
            ...dashboardFilterParams,
            [filterParams]: chartData?.label[clickedIndex],
          }),
        );
      }
    }
  };

  const getBackground = useMemo(() => {
    let cloneDefaultColors = [...arrayColor];
    if (isClearFilter) {
      setActiveItem(null);
    }
    if (chartData && chartData.datasets.length) {
      if (arrayColor.length < chartData.datasets.length) {
        const addColors = chartData.datasets.length - arrayColor.length;

        cloneDefaultColors = addRandomColors([...arrayColor], addColors);
      }
    }
    if (activeItem === null) {
      return [...cloneDefaultColors];
    } else {
      const newColors = [...cloneDefaultColors];
      const itemIndex = chartData?.label.findIndex((label) => label === activeItem);
      newColors.forEach((_, index, colors) => {
        if (itemIndex !== index) {
          colors[index] = '#dbdbdb';
        }
      });
      return newColors;
    }
  }, [activeItem, chartData, isClearFilter]);

  return {
    getBackground,
    onChartClick,
    onClick,
  };
};
