import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { css, useTheme } from '@emotion/react';
import { Button } from 'antd';
import React from 'react';

interface Props {
  onClick: () => void;
  text: string;
  shape?: 'circle' | 'round';
  icon?: AntdIconProps;
}

export const OutlineBtn = (props: Props) => {
  const { onClick, text, shape, icon } = props;
  const theme = useTheme();
  return (
    <div
      className="button-outline-wrap"
      css={css`
        .ant-btn {
          margin: 0 auto;
          border-color: ${theme.backgroundColor.buttonRed};
          padding: 4px 36px;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          .anticon {
            margin-left: 5px;
          }
          &:hover {
            background-color: ${theme.backgroundColor.buttonRed} !important;
            border-color: ${theme.backgroundColor.buttonRed}!important;
            color: ${theme.text.whiteColor};
          }
        }
      `}
    >
      <Button onClick={onClick} icon={icon} shape={shape}>
        {text}
      </Button>
    </div>
  );
};
