import styled from '@emotion/styled';
import { Input, InputProps } from 'antd';
import React from 'react';
import tw from 'twin.macro';

const CustomInputStyled = styled(Input)`
  .ant-form-item-explain {
    ${tw`absolute right-0 `}
    top: -30px;
  }
  &.ant-input-affix-wrapper-lg {
    padding-right: 30px;
    .ant-input-prefix {
      margin-right: 10px;
    }
  }
  &.ant-input-affix-wrapper:focus,
  &.ant-input-affix-wrapper-focused,
  &.ant-input:focus,
  &.ant-input-focused {
    ${tw`border-red! shadow-none`};
  }
  &.ant-input:focus,
  &.ant-input-affix-wrapper:focus,
  &.ant-input-focused,
  &.ant-input-affix-wrapper-focused {
    ${tw`shadow-none!`}
  }
  &.ant-input,
  .ant-input {
    ${tw`fhd:(text-25) sm:text-18 font-lato-semibold`}
    color: black !important;
  }
`;

export const CustomInput: React.FC<InputProps> = React.memo((props) => {
  return <CustomInputStyled {...props} autoComplete="off" size="large" className="input-custom rounded-7 fhd:h-56" />;
});
