import { css } from '@emotion/react';
import { Spin } from 'antd';
import { ChartInstance } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import CardPosition from 'src/components/card/CardPosition';
import { ContactChart } from 'src/components/chart/ContactChart';
import { useChartFilter } from 'src/hooks/useChartFilter';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { ChartDataType } from 'src/reducers/dashboard/model';
import { useAppSelector } from 'src/reducers/model';
import { barChartConfig } from 'src/utils/chartConfig';

const CampaignContact: React.FC = React.memo(() => {
  const BG_COLOR = ['#4383D9', '#001027', '#EBBE33', '#4E0500'];
  const chartRef: any = React.useRef<ChartInstance | null>(null);
  const { size, windowSize } = useWindowSize();
  const [isExpand, setIsExpand] = React.useState(false);
  const [chartInstaceStoraged, setChartInstance] = React.useState(null);
  const countLoading = useAppSelector((state) => state.dashboard.countLoading);
  const contactBar = useAppSelector((state) => state.dashboard.contact_bar);
  const { onChartClick, getBackground } = useChartFilter(contactBar as ChartDataType, 'contact_bar', BG_COLOR);

  return (
    <CardPosition
      height={`${windowSize <= 1366 ? 400 : 400}px`}
      width={`${windowSize <= 1366 ? 350 - size : 400 - size}px`}
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
        className="title-wrapper mb-10"
        css={css`
          max-height: 20%;
          overflow: hidden;
        `}
      >
        <h3 className={`title text-black text-center font-lato-heavy uppercase  break-words text-16`}>
          Campaign Contact History
        </h3>
      </div>
      <div
        className={`justify-between align-center h-full ${isExpand ? 'expanding' : ''}`}
        css={css`
          &.expanding {
            .contact-chart {
              .sub-text-contact {
                font-size: 18px;
              }

              .main-text-contact {
                font-size: 22px;
              }
              .chart-labels-right {
                top: 37%;
                right: 23%;
              }
              .chart-labels-left {
                left: 23%;
                top: 37%;
              }
            }
          }
        `}
      >
        {countLoading > 0 ? (
          <Spin size="large" className="max-h-full mt-100 flex-1 w-full" />
        ) : contactBar && contactBar.datasets.length > 0 ? (
          <>
            <div
              css={css`
                width: 100%;
                height: 50%;
              `}
            >
              <Bar
                ref={chartRef}
                {...barChartConfig({
                  dataset: contactBar?.datasets,
                  label: contactBar?.label,
                  isHorizontal: true,
                  bgColor: getBackground,
                  width: 'auto',
                  height: '100%',
                  title: '',
                  maxValue: contactBar ? Math.max(...contactBar.datasets) : 100,
                  tickXDisplay: true,
                  tickYDisplay: false,
                  chartRef,
                  useCustomLabel: true,
                  chartStorage: chartInstaceStoraged,
                  isExpand,
                  callback: (index: number) => onChartClick(index, contactBar, 'contact_bar'),
                })}
                className="max-h-full"
              />
            </div>
            <div
              className="max-h-full"
              css={css`
                width: 100%;
                height: 50%;
              `}
            >
              <ContactChart />
            </div>
          </>
        ) : (
          <div className="h-full flex justify-center items-center">
            <p className="text-center my-auto">No Data</p>
          </div>
        )}
      </div>
    </CardPosition>
  );
});

export default CampaignContact;
