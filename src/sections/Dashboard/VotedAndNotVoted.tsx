import { css } from '@emotion/react';
import { Spin } from 'antd';
import { ChartInstance } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import CardPosition from 'src/components/card/CardPosition';
import { useChartFilter } from 'src/hooks/useChartFilter';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { ChartDataType } from 'src/reducers/dashboard/model';
import { useAppSelector } from 'src/reducers/model';
import { barChartConfig } from 'src/utils/chartConfig';

const VotedAndNotVoted: React.FC = React.memo(() => {
  const BG_COLOR = ['#4383D9', '#001027'];
  const { size, windowSize } = useWindowSize();
  const [isExpand, setIsExpand] = React.useState(false);
  const [chartInstaceStoraged, setChartInstance] = React.useState(null);
  const chartRef: any = React.useRef<ChartInstance | null>(null);
  const countLoading = useAppSelector((state) => state.dashboard.countLoading);
  const voted = useAppSelector((state) => state.dashboard.voted);
  const { onChartClick, getBackground } = useChartFilter(voted as ChartDataType, 'voted', BG_COLOR);

  return (
    <CardPosition
      height={`${windowSize <= 1366 ? 180 : 200}px`}
      width={`${windowSize <= 1366 ? 420 - size : 500 - size}px`}
      expandLeft
      isExpandClick={(expand) => {
        setIsExpand(expand);
        // tricky to storage chart instance
        if (!chartInstaceStoraged) {
          setChartInstance(chartRef.current);
        }
      }}
    >
      <div
        className="title-wrapper mb-5"
        css={css`
          max-height: 20%;
          overflow: hidden;
        `}
      >
        <h3
          className={`title text-black text-center text-16 font-lato-heavy uppercase  break-words ${
            isExpand ? 'text-20' : 'text-16'
          }`}
        >
          Voted vs. not voted
        </h3>
      </div>{' '}
      {countLoading > 0 ? (
        <div className="h-full flex justify-center items-center">
          <Spin size="large" className="flex-1" />
        </div>
      ) : voted && voted.datasets.length > 0 ? (
        <div
          className="justify-between align-center pb-20"
          css={css`
            height: ${isExpand ? '400px' : 'calc(100% - 15px)'};
            margin-top: ${isExpand ? '5%' : 0};
          `}
        >
          <Bar
            ref={chartRef}
            {...barChartConfig({
              dataset: voted.datasets,
              label: voted.label,
              isHorizontal: true,
              bgColor: getBackground,
              width: 'auto',
              height: '100%',
              title: '',
              maxValue: voted ? Math.max(...voted.datasets) : 100,
              tickXDisplay: true,
              tickYDisplay: false,
              chartRef,
              callback: (index: number) => onChartClick(index, voted, 'voted'),
              useCustomLabel: true,
              isExpand,
              chartStorage: chartInstaceStoraged,
            })}
            className="max-h-full"
          />
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          <p>No Data</p>
        </div>
      )}
    </CardPosition>
  );
});

export default VotedAndNotVoted;
