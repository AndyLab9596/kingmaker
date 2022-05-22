import { css } from '@emotion/react';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Phone from 'src/assets/images/icons/phone.svg';
import UpperPhone from 'src/assets/images/icons/upper-phone.svg';
import { useChartFilter } from 'src/hooks/useChartFilter';
import { ChartDataType } from 'src/reducers/dashboard/model';
import { useAppSelector } from 'src/reducers/model';
import { pieAndDoughnutChartConfig } from 'src/utils/chartConfig';
import { calculatePercent } from 'src/utils/common';

export const ContactChart = () => {
  const BG_COLOR = ['#AFB3B6', '#EBBE33'];
  const contactPoll = useAppSelector((state) => state.dashboard.contact_poll);
  const { onClick, getBackground } = useChartFilter(contactPoll as ChartDataType, 'contact_poll', BG_COLOR);

  const chartRef = React.useRef(null);

  return (
    <div
      css={css`
        height: calc(100% - 15px);
      `}
      className="relative pb-30 contact-chart"
    >
      {contactPoll && contactPoll.datasets.length > 0 ? (
        <>
          <div
            css={css`
              top: 15%;
              @media (max-width: 768px) {
                display: none;
              }
            `}
            className="chart-labels-left absolute  left-5 text-center"
          >
            <img className="inline" src={Phone} alt="female" />
            <p className=" main-text-contact text-12 text-yellow-alt font-lato-heavy">
              {contactPoll && contactPoll.label[1]}{' '}
            </p>
            <p className="sub-text-contact text-22 xxl:text-29 font-lato-heavy">
              {contactPoll && calculatePercent(contactPoll?.datasets, 1)}%
            </p>
          </div>
          <Doughnut
            className="max-h-full relative z-10"
            ref={chartRef}
            {...pieAndDoughnutChartConfig({
              dataset: contactPoll?.datasets,
              labels: contactPoll?.label,
              getBackground,
              onClick: (event, elements) => onClick(event, elements, 'contact_poll', contactPoll),
            })}
          />
          <div
            css={css`
              top: 15%;
              @media (max-width: 768px) {
                display: none;
              }
            `}
            className="chart-labels-right absolute right-5 text-center"
          >
            <img className="inline" src={UpperPhone} alt="male" />
            <p className="text-gray-4 main-text-contact text-12 font-lato-heavy">
              {contactPoll && contactPoll.label[0]}{' '}
            </p>
            <p className="sub-text-contact text-22 xxl:text-29 font-lato-heavy">
              {contactPoll && calculatePercent(contactPoll?.datasets, 0)}%
            </p>
          </div>
        </>
      ) : (
        <div className="h-full flex justify-center items-center">
          <p>No data</p>
        </div>
      )}
    </div>
  );
};
