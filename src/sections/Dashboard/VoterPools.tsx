import { css } from '@emotion/react';
import { Spin } from 'antd';
import React, { useState } from 'react';
import CardPosition from 'src/components/card/CardPosition';
import Pool from 'src/components/pools';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { dashboardDataAction } from 'src/reducers/dashboard/action';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';

export interface Voter {
  title: string;
  value: number;
  color: string;
}

export const VoterPools = () => {
  const { size, windowSize } = useWindowSize();
  const [isExpand, setIsExpand] = React.useState(false);
  const votersLikelihoodPool = useAppSelector((state) => state.dashboard.voterLikelihoodPoll);
  const countLoading = useAppSelector((state) => state.dashboard.countLoading);
  const [activeItem, setActiveItem] = useState<null | string>(null);
  const isClearFilter = useAppSelector((state) => state.dashboard.isClearFilter);
  const dashboardFilterParams = useAppSelector((state) => state.dashboard.dashboardFilterParams);
  const dispatch = useAppDispatch();
  const votersPool: Voter[] = [];
  const voterColors = (title: string) => {
    if (title) {
      if (title === 'Likely Independent') return 'bg-yellow';
      if (title === 'Likely Republican') return 'bg-chart-red';
      if (title === 'Likely Democratic') return 'bg-blue';
    }
  };
  for (const key in votersLikelihoodPool) {
    const voter: Voter = {
      title: '',
      value: 0,
      color: '',
    };
    const voterValue = !votersLikelihoodPool[key] ? 0 : votersLikelihoodPool[key];
    voter.title = key;
    voter.value = voterValue;
    voter.color = voterColors(key) as string;
    votersPool.push(voter);
  }

  const reArrangeArray = (array, from, to) => {
    return array.splice(to, 0, array.splice(from, 1)[0]);
  };
  reArrangeArray(votersPool, 0, 1);

  const totalValue = votersPool.map((voter) => voter?.value);
  const getVoterArray = () => {
    if (activeItem === null) {
      return votersPool;
    } else {
      const newVotersPool = [...votersPool];
      newVotersPool.forEach((voter, index, voters) => {
        if (activeItem !== voter.title) {
          voters[index].color = 'bg-unselected';
        }
      });
      return newVotersPool;
    }
  };

  const onPollClick = (clickedItem) => {
    const active = clickedItem === activeItem;
    if (votersLikelihoodPool) {
      dispatch(
        dashboardDataAction.setFilterParam({
          name: 'voterLikelihoodPoll',
          data: votersLikelihoodPool,
        }),
      );
    }
    dispatch(dashboardDataAction.setIsClearFilter(false));
    if (active) {
      setActiveItem(null);
      dispatch(
        dashboardDataAction.setDashboardFilterParams({
          ...dashboardFilterParams,
          voter_likelihood_poll: '',
        }),
      );
    } else {
      setActiveItem(clickedItem);
      dispatch(
        dashboardDataAction.setDashboardFilterParams({
          ...dashboardFilterParams,
          voter_likelihood_poll: clickedItem,
        }),
      );
    }
  };

  React.useEffect(() => {
    if (isClearFilter) {
      setActiveItem(null);
    }
  }, [isClearFilter]);

  return (
    <CardPosition
      height="300"
      width={`${windowSize <= 1366 ? 350 - size : 400 - size}px`}
      expandRight
      isExpandClick={(expand) => {
        setIsExpand(expand);
      }}
    >
      <div
        className={`pool-wrapper w-full h-full ${isExpand ? 'expanding' : ''}`}
        css={css`
          &.expanding {
            width: 80%;
            margin: 50px auto;
            .title {
              font-size: 24px;
            }
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
          <h3 className="title text-black text-16 font-lato-heavy uppercase  break-words">Expected Turnout By Party</h3>
        </div>{' '}
        {countLoading > 0 ? (
          <div
            css={css`
              min-height: 212px;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <Spin size="large" className="max-h-full flex-1 w-full" />
          </div>
        ) : votersLikelihoodPool ? (
          <>
            {getVoterArray().map((voter, index) => (
              <Pool
                key={index}
                className={`${voter.color} overflow-hidden cursor-pointer`}
                voter={voter}
                handleClick={() => onPollClick(voter.title)}
                totalValue={totalValue}
                index={index}
              />
            ))}
          </>
        ) : (
          <div
            css={css`
              min-height: 212px;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <p>No Data</p>
          </div>
        )}
      </div>
    </CardPosition>
  );
};
