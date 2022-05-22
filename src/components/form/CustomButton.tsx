import React from 'react';
import { Button, ButtonProps } from 'antd';
import styled from '@emotion/styled';
import tw from 'twin.macro';

const CustomButtonStyled = styled(Button)`
  &.ant-btn {
    ${tw`fhd:(h-56 leading-30 text-25) leading-18 h-44 rounded-7 font-lato-semibold`}
  }
  &.ant-btn-dangerous.ant-btn-primary {
    ${tw`border-red bg-red shadow-red hover:(bg-red-light border-red-light)`}
  }
  &.ant-btn-primary {
    ${tw`border-blue bg-blue shadow-blue hover:(bg-blue-light border-blue-light)`}
  }
`;
export const CustomButton: React.FC<ButtonProps> = React.memo((props) => {
  return <CustomButtonStyled {...props} />;
});
