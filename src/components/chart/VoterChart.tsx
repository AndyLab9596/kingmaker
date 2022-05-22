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
const VoterChart: React.FC<VoterChartProps> = React.memo(({ isExpand }) => {
  const BG_COLOR = ['#EBBE33', '#4383D9', '#4E0500', '#AFB3B6', '#001027'];
  const chartRef: any = React.useRef<ChartInstance | null>(null);
  const voterLikelihoodBar = useAppSelector((state) => state.dashboard.voterLikelihoodBar);
  const countLoading = useAppSelector((state) => state.dashboard.countLoading);
  const { onChartClick, getBackground } = useChartFilter(
    voterLikelihoodBar as ChartDataType,
    'voter_likelihood_bar',
    BG_COLOR,
  );

  return (
    <>
      {countLoading > 0 ? (
        <Spin size="large" className="max-h-full mt-100 flex-1 w-full" />
      ) : voterLikelihoodBar && voterLikelihoodBar.datasets.length > 0 ? (
        <Bar
          ref={chartRef}
          {...barChartConfig({
            chartRef,
            dataset: voterLikelihoodBar.datasets,
            label: voterLikelihoodBar.label,
            isHorizontal: false,
            bgColor: getBackground,
            width: 'auto',
            height: '200',
            title: '',
            maxValue: voterLikelihoodBar ? Math.max(...voterLikelihoodBar.datasets) : 100,
            tickXDisplay: true,
            tickYDisplay: true,
            callback: (index: number) => onChartClick(index, voterLikelihoodBar, 'voterLikelihoodBar'),
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

export default VoterChart;
