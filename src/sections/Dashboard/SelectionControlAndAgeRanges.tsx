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
import SelectionControl from './SelectionControl';

const SelectionControlAndAgeRanges = React.memo(() => {
  const BG_COLOR = ['#4383D9', '#001027', '#EBBE33', '#4E0500', '#AFB3B6'];
  const { size, windowSize } = useWindowSize();
  const [isExpand, setIsExpand] = React.useState(false);
  // store chart ref when expand
  const [chartInstaceStoraged, setChartInstance] = React.useState(null);

  const ageBracket = useAppSelector((state) => state.dashboard.ageBracket);
  const countLoading = useAppSelector((state) => state.dashboard.countLoading);
  const ageRange = useAppSelector((state) => state.dashboard.ageRange);
  const chartRef: any = React.useRef<ChartInstance | null>(null);
  const { onChartClick, getBackground } = useChartFilter(ageBracket as ChartDataType, 'age_bracket', BG_COLOR);

  return (
    <CardPosition
      isExpandClick={(expand) => {
        setIsExpand(expand);
        // tricky to storage chart instance
        if (!chartInstaceStoraged) {
          setChartInstance(chartRef.current);
        }
      }}
      width={`${windowSize <= 1366 ? 420 - size : 500 - size}px`}
      height="240px"
      expandLeft
    >
      <div
        className={`flex justify-between align-center h-full flex-wrap ${isExpand ? 'expanding' : ''}`}
        css={css`
          &.expanding {
            .title {
              font-size: 24px;
            }

            .age-range {
              font-size: 20px;
            }

            .chart-wrapper {
              height: 90%;
            }

            .switch-wrapper {
              width: 80%;
              margin: 0 auto;
              margin-top: 30%;
            }

            .block-title {
              font-size: 25px;
            }

            .switch {
              width: 200px;
              height: 60px;
              &.ant-switch-checked .ant-switch-inner {
                font-size: 18px;
              }

              &.ant-switch-checked .ant-switch-handle {
                top: 6px;
                width: 50px;
                height: 50px;
                &:before {
                  border-radius: 50%;
                }
              }
            }
          }
        `}
      >
        <div
          css={css`
            width: 45%;

            @media (max-width: 768px) {
              display: none;
            }
          `}
        >
          <SelectionControl />
        </div>
        <div
          className="divider h-full self-center w-1 bg-gray"
          css={css`
            @media (max-width: 800px) {
              display: none;
            }
          `}
        ></div>
        <div
          className="max-h-full"
          css={css`
            width: 45%;

            @media (max-width: 800px) {
              width: 100%;
            }
          `}
        >
          <div
            className="title-wrapper mb-5"
            css={css`
              max-height: 20%;
              overflow: hidden;
            `}
          >
            <h3 className="title text-black text-center text-16 font-lato-heavy uppercase  break-words">Age Ranges</h3>
          </div>
          <div
            css={css`
              height: calc(100% - 35px);
            `}
            className="mb-5 chart-wrapper flex justify-center items-center"
          >
            {countLoading > 0 ? (
              <Spin size="large" className="max-h-full" />
            ) : ageBracket && ageBracket.datasets.length ? (
              <Bar
                ref={chartRef}
                {...barChartConfig({
                  dataset: ageBracket ? ageBracket?.datasets : [],
                  label: ageBracket ? ageBracket?.label : [],
                  isHorizontal: false,
                  bgColor: getBackground,
                  width: 'auto',
                  height: '100%',
                  title: '',
                  maxValue: ageBracket ? Math.max(...ageBracket.datasets) + 2 / 100 : 100,
                  tickXDisplay: false,
                  tickYDisplay: true,
                  chartRef: chartRef,
                  callback: (index: number) => onChartClick(index, ageBracket, 'ageBracket'),
                  useCustomLabel: true,
                  chartStorage: chartInstaceStoraged,
                  isExpand,
                })}
                className="max-h-full"
              />
            ) : (
              <p className="my-auto">No Data</p>
            )}
          </div>
          <p className="age-range text-center text-black font-lato-bold text-9 break-words">
            {ageRange && ageRange.length > 0 ? `Age Range: ${ageRange[0]} to ${ageRange[ageRange.length - 1]}` : ''}
          </p>
        </div>
      </div>
    </CardPosition>
  );
});

export default SelectionControlAndAgeRanges;
