import { css } from '@emotion/react';
import React from 'react';
import CardPosition from 'src/components/card/CardPosition';
import PreferredChart from 'src/components/chart/PreferredChart';
import VoterChart from 'src/components/chart/VoterChart';
import { useWindowSize } from 'src/hooks/useWindowSize';

const VoterAndPreferred: React.FC = React.memo(() => {
  const { size, windowSize } = useWindowSize();
  const [isExpand, setIsExpand] = React.useState(false);

  return (
    <CardPosition
      height={`400px`}
      width={`${windowSize <= 1366 ? 350 - size : 400 - size}px`}
      expandLeft
      isExpandClick={(expand) => {
        setIsExpand(expand);
      }}
    >
      <div
        className={`flex justify-between align-center h-full ${isExpand ? 'expanding' : ''}`}
        css={css`
          &.expanding {
            .title {
              font-size: 24px;
            }

            .voter-chart {
              height: 90%;
            }

            .prefer-chart {
              height: 70%;
            }
          }
        `}
      >
        <div
          className="max-h-full flex flex-col justify-between"
          css={css`
            width: 48%;
          `}
        >
          <div
            className="title-wrapper mb-5"
            css={css`
              max-height: 20%;
              overflow: hidden;
            `}
          >
            <h3 className="title text-center text-16 font-lato-heavy uppercase break-words">
              Voters <br /> Likelihood
            </h3>
          </div>

          <div
            className="voter-chart"
            css={css`
              height: 80%;
            `}
          >
            <VoterChart isExpand={isExpand} />
          </div>
        </div>
        <div
          className="max-h-full flex flex-col justify-between"
          css={css`
            width: 48%;
          `}
        >
          <div
            className="title-wrapper mb-5"
            css={css`
              max-height: 20%;
              overflow: hidden;
            `}
          >
            <h3 className="title text-black text-center text-16 font-lato-heavy uppercase  break-words">
              Preferred <br /> voting style
            </h3>
          </div>

          <div
            className="prefer-chart"
            css={css`
              height: 70%;
              margin-bottom: 15px;
            `}
          >
            <PreferredChart isExpand={isExpand} />
          </div>
        </div>
      </div>
    </CardPosition>
  );
});

export default VoterAndPreferred;
