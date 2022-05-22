import { css } from '@emotion/react';
import { Card } from 'antd';
import React, { useState } from 'react';
// import { GiContract } from 'react-icons/gi';
import { HiArrowsExpand } from 'react-icons/hi';

interface CardPositionProps {
  width?: string | number;
  height?: string | number;
  expandLeft?: boolean;
  expandRight?: boolean;
  isExpandClick?: (isExpand: boolean) => void;
}

interface CardPositionFullProps extends CardPositionProps {
  setIsFullScreen(value: boolean): void;
  isFullScreen: boolean;
}

const getValueStyle = (value?: string | number): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'string') return value;
  else if (typeof value === 'number') {
    return `${value}px`;
  }
};
const paddingFullScreen = 30;

const CardPosition: React.FC<CardPositionProps> = React.memo((props) => {
  const { height, width, children, expandLeft, expandRight, isExpandClick } = props;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const expandIconStyles = { width: '16.5px', height: '16.5px', opacity: 0.5 };

  return (
    <>
      <Card
        css={css`
          min-height: ${getValueStyle(height)};
          width: ${getValueStyle(width)};
          border-radius: 22px !important;
          box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.2em, rgba(90, 125, 188, 0.05) 0px 0em 0em;

          .ant-card-body {
            height: 100%;
            overflow-x: hidden;
            overflow-y: hidden;
          }
        `}
      >
        {(expandLeft || expandRight) && (
          <div
            className="absolute right-15 top-8 cursor-pointer"
            onClick={() => {
              isExpandClick && isExpandClick(true);
              setIsFullScreen(!isFullScreen);
            }}
          >
            <HiArrowsExpand style={expandIconStyles} />
          </div>
        )}
        {children}
      </Card>
      {isFullScreen && <CardPositionFull {...props} setIsFullScreen={setIsFullScreen} isFullScreen={isFullScreen} />}
    </>
  );
});

const CardPositionFull: React.FC<CardPositionFullProps> = (props) => {
  const { children, expandLeft, expandRight, setIsFullScreen, isExpandClick } = props;
  const expandIconStyles = { width: '16.5px', height: '16.5px', opacity: 0.5 };
  return (
    <Card
      css={css`
        position: fixed !important;
        z-index: 9999;
        left: ${paddingFullScreen / 2}px;
        top: ${paddingFullScreen / 2}px;
        height: calc(100% - ${paddingFullScreen}px);
        width: calc(100% - ${paddingFullScreen}px);
        border-radius: 22px !important;
        box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.2em, rgba(90, 125, 188, 0.05) 0px 0em 0em;
        .ant-card-body {
          width: 100%;
          height: 100%;
        }
      `}
    >
      {(expandLeft || expandRight) && (
        <div
          className="absolute right-15 top-6 cursor-pointer"
          onClick={() => {
            setIsFullScreen(false);
            isExpandClick && isExpandClick(false);
          }}
        >
          <HiArrowsExpand style={expandIconStyles} />
        </div>
      )}
      <div className="w-full h-full">{children}</div>
    </Card>
  );
};

export default CardPosition;
