import React from 'react';
import styled from '@emotion/styled';
import { Progress } from 'antd';
import tw from 'twin.macro';
import { Voter } from 'src/sections/Dashboard/VoterPools';
import { calculatePercent } from 'src/utils/common';

interface PoolProps {
  className: string;
  voter: Voter;
  handleClick: () => void;
  totalValue: number[];
  index: number;
}

const PoolWrapper = styled.div`
  width: 100%;
  ${tw`rounded-7 my-10 px-5 py-5`}

  .ant-progress-inner {
    background-color: rgba(255, 255, 255, 0.5);
  }
  .ant-progress-inner,
  .ant-progress-bg {
    ${tw`rounded-none`}
  }

  .ant-progress-bg {
    background-color: #707070;
  }
`;

const Pool: React.FC<PoolProps> = React.memo((props) => {
  const { className, voter, handleClick, totalValue, index } = props;
  const percent = calculatePercent(totalValue, index);

  return (
    <PoolWrapper className={className} onClick={handleClick}>
      <div className="voter-info flex justify-between">
        <p className="text-11">{voter.title}</p>
        <p className="text-11">{`${voter.value} (${percent}%)`}</p>
      </div>
      <Progress percent={Number(percent)} showInfo={false} />
    </PoolWrapper>
  );
});

export default Pool;
