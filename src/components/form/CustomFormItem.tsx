import { FormItemProps, Form } from 'antd';
import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import xIcon from 'src/assets/images/icons/x.svg';
import checkMarkCircle from 'src/assets/images/icons/checkmark-circle.svg';

const ItemStyle = styled(Form.Item)`
  .ant-form-item-label {
    & > label {
      ${tw`font-lato-semibold fhd:(text-25 leading-30) text-18 leading-18`}
    }
    padding: 0 0 5px !important;
  }
  .ant-form-item-explain {
    [role='alert'] {
      ${tw`fhd:(text-25 leading-30) text-18 leading-18 `}
      color: #FF0000 !important;
    }
  }
  &.ant-form-item-has-error {
    .ant-input-affix-wrapper:not(:hover):not(.ant-input-affix-wrapper-focused) {
      border-color: #d9d9d9 !important;
    }
    &:not(.ant-input-disabled):not(.ant-input-borderless) .ant-input:not(:hover) {
      border-color: #d9d9d9 !important;
    }
  }
  &.ant-form-item-has-feedback {
    &.ant-form-item-has-error {
      .ant-form-item-children-icon {
        background: url(${xIcon}) no-repeat;
        background-size: 14px 14px;
        background-position: center;
        & > span {
          display: none;
        }
      }
    }
    &.ant-form-item-has-success {
      .ant-form-item-children-icon {
        background: url(${checkMarkCircle}) no-repeat;
        background-size: 16px 16px;
        background-position: center;

        & > span {
          display: none;
        }
      }
    }
  }
`;

export const CustomFormItem: React.FC<FormItemProps> = React.memo((props) => {
  const { children, ...resp } = props;
  return <ItemStyle {...resp}>{children}</ItemStyle>;
});
