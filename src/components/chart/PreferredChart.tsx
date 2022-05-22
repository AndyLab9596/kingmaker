import { Spin } from 'antd';
import { ChartInstance } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useChartFilter } from 'src/hooks/useChartFilter';
import { ChartDataType } from 'src/reducers/dashboard/model';
import { useAppSelector } from 'src/reducers/model';
import { barChartConfig } from 'src/utils/chartConfig';

interface VoterChartProps {
  isExpand: boolean;
}
// TODO Apply Props
const PreferredChart: React.FC<VoterChartProps> = React.memo(({ isExpand }) => {
  const BG_COLOR = ['#EBBE33', '#4383D9', '#4E0500', '#DE2228', '#AFB3B6'];
  const chartRef: any = React.useRef<ChartInstance | null>(null);
  const preferredVotingStyleBar = useAppSelector((state) => state.dashboard.preferredVotingStyleBar);
  const countLoading = useAppSelector((state) => state.dashboard.countLoading);
  const { onChartClick, getBackground } = useChartFilter(
    preferredVotingStyleBar as ChartDataType,
    'preferred_voting_style_bar',
    BG_COLOR,
  );

  return (
    <>
      {countLoading > 0 ? (
        <Spin size="large" className="max-h-full mt-100 flex-1 w-full" />
      ) : preferredVotingStyleBar && preferredVotingStyleBar.datasets.length > 0 ? (
        <Bar
          ref={chartRef}
          {...barChartConfig({
            chartRef,
            dataset: preferredVotingStyleBar.datasets,
            label: preferredVotingStyleBar.label,
            isHorizontal: false,
            bgColor: getBackground,
            width: 'auto',
            height: '200',
            title: '',
            maxValue: preferredVotingStyleBar ? Math.max(...preferredVotingStyleBar.datasets) : 100,
            tickXDisplay: true,
            tickYDisplay: true,
            callback: (index: number) => onChartClick(index, preferredVotingStyleBar, 'preferredVotingStyleBar'),
            isExpand,
          })}
          className="max-h-full"
        />
      ) : (
        <div className="h-full flex justify-center items-center">
          <p className="text-center my-auto">No Data</p>
        </div>
      )}
    </>
  );
});

export default PreferredChart;
