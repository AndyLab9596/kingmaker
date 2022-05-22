import { css } from '@emotion/react';
import React from 'react';
import { Spin } from 'antd';

const Waiting: React.FC = () => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        .app-loading {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .text {
            margin-top: 1rem;
            font-size: 24px;
            font-weight: 500;
            font-family: Roboto;
          }
          .ant-spin-lg .ant-spin-dot {
            font-size: 48px;
          }
          .ant-spin-lg .ant-spin-dot i {
            width: 22px;
            height: 22px;
          }
        }
      `}
    >
      <div className="app-loading">
        <Spin size="large" />
      </div>
    </div>
  );
};

export default Waiting;
