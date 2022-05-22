import React from 'react';
import { Switch, SwitchProps } from 'antd';
import styled from '@emotion/styled';
import tw from 'twin.macro';

interface CustomSwitchType extends SwitchProps {
  bgColor?: string;
}

const CustomSwitchStyled = styled(Switch)<CustomSwitchType>`
  &.ant-switch-checked {
    background-color: ${(p: CustomSwitchType) => p.bgColor};
  }

  /* &.ant-switch-checked .ant-switch-handle {
    ${tw`left-2!`}
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -o-transition: none !important;
    transition: none !important;
  }

  &.ant-switch-checked .ant-switch-inner {
    ${tw`text-9 font-lato mt-1 mr-7 ml-25`}
  }
  div {
    box-shadow: none !important;
    animation: none 0 ease 0 1 normal !important;
  }
  .ant-click-animating-node {
    display: none !important;
    content: none;
    animation-fill-mode: none;
  }
  [ant-click-animating-without-extra-node='true']::after {
    display: none;
  }
  &.ant-switch:not(.ant-switch-disabled):active.ant-switch-checked .ant-switch-handle::before {
    left: 0;
  } */
`;
export const CustomSwitch: React.FC<CustomSwitchType> = React.memo(({ bgColor, ...props }) => {
  return <CustomSwitchStyled {...props} bgColor={bgColor} />;
});
