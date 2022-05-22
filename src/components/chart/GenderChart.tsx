import { css } from '@emotion/react';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import FemaleIcon from 'src/assets/images/icons/female.svg';
import MaleIcon from 'src/assets/images/icons/male.svg';
import { useChartFilter } from 'src/hooks/useChartFilter';
import { ChartDataType } from 'src/reducers/dashboard/model';
import { useAppSelector } from 'src/reducers/model';
import { pieAndDoughnutChartConfig } from 'src/utils/chartConfig';
import { calculatePercent } from 'src/utils/common';

interface GenderChartProps {
  isExpand?: boolean;
}

export const GenderChart = ({ isExpand }: GenderChartProps) => {
  // const BG_COLOR = ['#AFB3B6', '#232323', '#EBBE33'];
  const BG_COLOR = ['#EBBE33', '#232323', '#AFB3B6'];
  const [chartInstance, setChartInstance] = React.useState<null | any>(null);
  const gender = useAppSelector((state) => state.dashboard.gender);
  const genderData = gender?.datasets as number[];
  const { onClick, getBackground } = useChartFilter(gender as ChartDataType, 'gender', BG_COLOR);
  const chartRef = React.useRef(null);
  React.useEffect(() => {
    if (chartRef.current) {
      setChartInstance(chartRef.current);
    }
  }, [chartRef.current]);

  return (
    <>
      {gender && gender?.datasets.length > 0 ? (
        <div className="chart-gender h-full  relative p-15 z-0">
          <div
            css={css`
              top: ${!isExpand ? '40%' : 'calc(50% + 6px)'};

              @media (max-width: 768px) {
                display: none;
              }
            `}
            className="chart-labels-left absolute  -left-5 text-center"
          >
            <img className="inline" src={FemaleIcon} alt="female" />
            <p className="font-lato-heavy text-8">Female</p>
            <p className="font-lato-heavy text-8">{chartInstance && calculatePercent(genderData, 2)}%</p>
          </div>
          <div
            css={css`
              top: ${!isExpand ? '40%' : 'calc(50% + 6px)'};

              @media (max-width: 768px) {
                display: none;
              }
            `}
            className="chart-labels-right absolute -right-5 text-center"
          >
            <img className="inline" src={MaleIcon} alt="male" />
            <p className="font-lato-heavy text-8">Male</p>
            <p className="font-lato-heavy text-8">{chartInstance && calculatePercent(genderData, 0)}%</p>
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
            <p className="text-8 font-lato-heavy">N/A</p>
            <p className="text-8 font-lato-heavy">{chartInstance && calculatePercent(genderData, 1)}%</p>
          </div>
          <Doughnut
            className="max-h-full"
            ref={chartRef}
            {...pieAndDoughnutChartConfig({
              dataset: genderData,
              labels: gender.label,
              onClick: (event, elements) => onClick(event, elements, 'gender', gender),
              getBackground,
              title: 'GENDER',
              isExpand,
            })}
          />
        </div>
      ) : (
        <>
          <h3 className="title text-black  text-center text-16 font-lato-heavy uppercase  break-words mt-22">gender</h3>
          <div className="h-full flex items-center justify-center">
            <p className="">No Data</p>
          </div>
        </>
      )}
    </>
  );
};
