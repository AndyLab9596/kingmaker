import { css } from '@emotion/react';
import React, { Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useChartFilter } from 'src/hooks/useChartFilter';
import { ChartDataType } from 'src/reducers/dashboard/model';
import { useAppSelector } from 'src/reducers/model';
import { pieAndDoughnutChartConfig } from 'src/utils/chartConfig';
import { calculatePercent } from 'src/utils/common';

interface EstimatedChartProps {
  isExpand?: boolean;
}

export const EstimatePartyChart = ({ isExpand }: EstimatedChartProps) => {
  const BG_COLOR = ['#DE2228', '#2185E8', '#F9C438'];
  const [chartInstance, setChartInstance] = React.useState<null | any>(null);
  const chartRef = React.useRef(null);

  const estParty = useAppSelector((state) => state.dashboard.est_party);
  const estPartyData = estParty?.datasets as number[];

  const { onClick, getBackground } = useChartFilter(estParty as ChartDataType, 'est_party', BG_COLOR);

  React.useEffect(() => {
    if (chartRef.current) {
      setChartInstance(chartRef.current);
    }
  }, [chartRef.current]);

  return (
    <>
      {estParty && estParty?.datasets.length > 0 ? (
        <div className="chart-estimated h-full relative p-15 z-0">
          <div
            className="chart-labels-left absolute  -left-8 text-center z-0"
            css={css`
              @media (max-width: 768px) {
                display: none;
              }
              top: calc(50% + 6px);
            `}
          >
            <p className="text-8 font-lato-heavy  text-yellow">Independent</p>
            <p className="text-8 font-lato-heavy">{chartInstance && calculatePercent(estPartyData, 2)}%</p>
          </div>
          <div
            className="chart-labels-right absolute -right-8 text-center z-0"
            css={css`
              @media (max-width: 768px) {
                display: none;
              }
              top: calc(50% + 6px);
            `}
          >
            <p className="font-lato-heavy text-8 text-chart-red ">Republican</p>
            <p className="font-lato-heavy text-8">{chartInstance && calculatePercent(estPartyData, 0)}%</p>
          </div>
          <div
            className="chart-labels-right absolute  left-1/2 text-center z-0"
            css={css`
              @media (max-width: 768px) {
                display: none;
              }
              @media (max-width: 1366px) {
                bottom: ${!isExpand ? '-10%' : '-25px'};
              }
              bottom: ${!isExpand ? '-10%' : '0%'};
              transform: translateX(-50%);
            `}
          >
            <p className="text-8 font-lato-heavy text-chart-blue">Democratic</p>
            <p className="text-8 font-lato-heavy">{chartInstance && calculatePercent(estPartyData, 1)}%</p>
          </div>
          <div className="h-full w-full z-10 relative">
            <Doughnut
              ref={chartRef}
              {...pieAndDoughnutChartConfig({
                dataset: estParty?.datasets,
                labels: estParty?.label,
                onClick: (event, elements) => onClick(event, elements, 'est_party', estParty),
                getBackground,
                title: 'ESTIMATED PARTY',
                isExpand,
                isShortHand: true,
              })}
            />
          </div>
        </div>
      ) : (
        <>
          <h3 className="title text-black  text-center text-16 font-lato-heavy uppercase  break-words mt-22">
            estimated party
          </h3>
          <div className="h-full flex items-center justify-center">
            <p className="">No Data</p>
          </div>
        </>
      )}
    </>
  );
};
