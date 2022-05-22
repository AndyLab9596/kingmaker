import React from 'react';
import { Checkbox, CheckboxProps } from 'antd';
import styled from '@emotion/styled';
import tw from 'twin.macro';

const CustomCheckboxStyled = styled(Checkbox)`
  .ant-checkbox {
    .ant-checkbox-inner {
      ${tw`fhd:(w-22 h-22 text-20)`}
    }
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    ${tw`bg-red border-red`}
  }
  &.ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    ${tw`border-red`}
  }
  .ant-checkbox-checked::after {
    ${tw`border-red`}
  }
`;

const CustomCheckboxXStyled = styled(CustomCheckboxStyled)`
  .ant-checkbox-checked .ant-checkbox-inner {
    ${tw`text-red bg-white `}
    &::after {
      content: 'x';
      border: 0px;
      transform: scale(1) translate(-50%, -50%);
      left: 50%;
      top: 30%;
    }
  }
`;

export const CustomCheckbox: React.FC<CheckboxProps> = React.memo((props) => {
  return <CustomCheckboxStyled {...props} />;
});

export const CustomCheckboxX: React.FC<CheckboxProps> = React.memo((props) => {
  return <CustomCheckboxXStyled {...props} />;
});
