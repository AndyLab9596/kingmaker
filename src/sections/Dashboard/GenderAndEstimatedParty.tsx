import { css } from '@emotion/react';
import { Spin } from 'antd';
import * as React from 'react';
import CardPosition from 'src/components/card/CardPosition';
import { EstimatePartyChart } from 'src/components/chart/EstimatedPartyChart';
import { GenderChart } from 'src/components/chart/GenderChart';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useAppSelector } from 'src/reducers/model';

export default function GenderAndEsimatedChart() {
  const { size, windowSize } = useWindowSize();
  const [isExpand, setIsExpand] = React.useState(false);
  const countLoading = useAppSelector((state) => state.dashboard.countLoading);

  return (
    <CardPosition
      height={`${windowSize <= 1366 ? 200 : 233}px`}
      width={`${windowSize <= 1366 ? 420 - size : 500 - size}px`}
      expandLeft
      isExpandClick={(expand) => {
        setIsExpand(expand);
      }}
    >
      <div
        className={`chart-wrapper h-full flex justify-between align-center ${isExpand ? 'expanding' : ''}`}
        css={css`
          &.expanding {
            .chart-gender,
            .chart-estimated {
              height: 90%;
              width: 80%;
              margin: 30px auto 0 auto;
              p {
                font-size: 12px;
              }
            }

            .chart-gender {
              .chart-labels-left {
                left: -50px;
                /* top: 50%; */
              }

              .chart-labels-right {
                right: -50px;
                /* top: 50%; */
              }
            }

            .chart-estimated {
              .chart-labels-left {
                left: -55px;
                @media (max-width: 1366px) {
                  left: ${!isExpand ? '-8px' : '-65px'};
                }
              }

              .chart-labels-right {
                right: -55px;
              }
            }
          }
        `}
      >
        {countLoading > 0 ? (
          <>
            <div
              css={css`
                width: 45%;
              `}
            >
              <h3 className="title text-black  text-center text-16 font-lato-heavy uppercase  break-words">gender</h3>
              <div className="h-full flex items-center justify-center">
                <Spin size="large" className="flex-1" />
              </div>
            </div>

            <div className="divider  h-full w-1 bg-gray"></div>
            <div
              css={css`
                width: 45%;
              `}
            >
              <h3 className="title text-black  text-center text-16 font-lato-heavy uppercase  break-words">
                estimated party
              </h3>
              <div className="h-full flex items-center justify-center">
                <Spin size="large" className="flex-1" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              css={css`
                width: 45%;
              `}
            >
              <GenderChart isExpand={isExpand} />
            </div>

            <div className="divider  h-full w-1 bg-gray"></div>
            <div
              css={css`
                width: 45%;
              `}
            >
              <EstimatePartyChart isExpand={isExpand} />
            </div>
          </>
        )}
      </div>
    </CardPosition>
  );
}
