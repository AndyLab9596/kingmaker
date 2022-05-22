import { css } from '@emotion/react';
import { Spin } from 'antd';
import React from 'react';
import { ChartProps } from 'react-chartjs-2';
import CardPosition from 'src/components/card/CardPosition';
import DoughnutChart from 'src/components/chart/DoughnutChart';
import { useChartFilter } from 'src/hooks/useChartFilter';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { ChartDataType } from 'src/reducers/dashboard/model';
import { useAppSelector } from 'src/reducers/model';
import { calculatePercent, externalTooltipHandler } from 'src/utils/common';
import { CityCouncilType } from 'src/utils/const';

const CityCouncilDistrictChart = () => {
  const BG_COLOR = ['#DE2228', '#4383D9', '#EBBE33', '#4E0500', '#001027', '#AFB3B6'];

  const [isExpand, setIsExpand] = React.useState(false);
  const { size, windowSize } = useWindowSize();
  const cityCouncil = useAppSelector((state) => state.dashboard.cityCouncil);
  const countLoading = useAppSelector((state) => state.dashboard.countLoading);
  const profile = useAppSelector((state) => state.auth.myProfile);
  const { onClick, getBackground } = useChartFilter(cityCouncil as ChartDataType, 'city_council', BG_COLOR);

  const chartProps: ChartProps<'doughnut'> = {
    options: {
      cutout: '68%',
      onClick: (event, elements) => onClick(event, elements, 'cityCouncil', cityCouncil),
      onResize: () => {
        // do nothing
        // console.log({ chart, size });
      },
      plugins: {
        legend: {
          display: false,
          onClick: () => {
            console.log('do nothing');
          },
          position: 'right',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: isExpand ? 30 : 20,
            color: 'black',
            font: {
              size: isExpand ? 22 : 9,
            },
          },
        },
        title: {
          text: 'Voter Participation by City Council District',
          display: false,
        },
        tooltip: {
          backgroundColor: 'black',
          enabled: false,
          external: externalTooltipHandler,
          callbacks: {
            label: function (context) {
              const label = `${context.label}: ${cityCouncil?.datasets[context.dataIndex]} (${calculatePercent(
                cityCouncil?.datasets,
                context.dataIndex,
              )}%)`;
              return label;
            },
          },
        },
      },
    },
    type: 'doughnut',

    data: {
      labels: cityCouncil ? cityCouncil.label : [],
      datasets: [
        {
          data: cityCouncil ? cityCouncil.datasets : [],
          backgroundColor: getBackground,
          borderWidth: 0,
        },
      ],
    },
    width: 'auto',
    height: '100%',
  };

  const buildTitle = React.useCallback(() => {
    switch (profile?.race?.title) {
      case CityCouncilType.COUNTY:
        return 'Expected Voter Participation by County Commisioner District';
      case CityCouncilType.STATE_LEVELS_RACE:
        return 'Expected Voter Participation by Zip Code';
      default:
        // old version: "Expected voter participation by City Council"
        return 'Voter Participation by County';
    }
  }, [profile]);

  return (
    <CardPosition
      height={`${windowSize <= 1366 ? 300 : 350}px`}
      width={`${windowSize <= 1366 ? 420 - size : 500 - size}px`}
      expandLeft
      isExpandClick={(expand) => setIsExpand(expand)}
    >
      <div
        className={`h-full ${isExpand ? 'expanding' : ''} ${windowSize <= 1366 ? 'min-size' : ''}`}
        // handle expand style
        css={css`
          &.min-size {
            .chart {
              width: ${isExpand ? '30vw' : '230px'};
              height: ${isExpand ? '60vh' : '220px'};
            }
          }

          &.expanding {
            .chart-wrapper {
              margin: 50px auto 0 auto;
            }

            h3.title {
              font-size: 24px;
              margin-top: 10px;
            }
          }
        `}
      >
        <h3 className="title text-black text-center text-16 tracking-tighter font-lato-bold uppercase break-words">
          {buildTitle()}
        </h3>

        <div
          className="chart-wrapper flex justify-center align-center"
          css={css`
            height: 100%;
          `}
        >
          {countLoading > 0 ? (
            <Spin size="large" className="max-h-full mt-100" />
          ) : cityCouncil && cityCouncil.datasets.length ? (
            <div
              className="wrapper flex mt-15 w-full"
              css={css`
                justify-content: ${isExpand ? 'center' : 'space-between'};
              `}
            >
              <div
                className="chart ml-20"
                css={css`
                  width: ${isExpand ? '30vw' : '260px'};
                  height: ${isExpand ? '60vh' : '260px'};
                `}
              >
                <DoughnutChart {...chartProps} className="max-h-full" />
              </div>
              <div
                className="labels mt-20 pl-12"
                css={css`
                  height: 80%;
                  overflow-y: hidden;
                  &:hover {
                    overflow-y: overlay;
                  }
                  margin-left: ${isExpand ? '30px' : '5px'};
                `}
              >
                {cityCouncil.label.map((value, index) => (
                  <div key={index} className="label-item flex items-center mb-20">
                    <span
                      css={css`
                        background-color: ${getBackground[index]};
                      `}
                      className="w-12 h-12 rounded-full inline-block mr-10"
                    ></span>
                    <p
                      css={css`
                        width: ${isExpand ? '300px' : '90px'};
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      `}
                      className="text-12 font-lato font-semibold"
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="my-auto">No Data</p>
          )}
        </div>
      </div>
    </CardPosition>
  );
};

export default CityCouncilDistrictChart;
