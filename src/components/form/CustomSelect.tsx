import React from 'react';
import { Select, SelectProps } from 'antd';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { IoMdArrowDropdown } from 'react-icons/io';

const CustomSelectStyle = styled(Select)`
  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    ${tw`rounded-7 fhd:h-full`}
  }
  &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    ${tw`border-red! shadow-none`};
  }
  &.ant-select {
    .ant-select-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
    }
  }
  .ant-select-selector {
    ${tw`h-full`}
    .ant-select {
      ${tw`fhd:leading-56`}
    }
  }
  &.ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-item {
    ${tw`fhd:leading-56`}
  }
  &.ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector::after {
    ${tw`fhd:leading-56`}
  }
  .ant-select-selection-item {
    ${tw`fhd:(text-25) sm:text-16 font-lato-semibold`}
  }
`;

export const CustomSelect: React.FC<SelectProps<any>> = React.memo((props) => {
  return (
    <CustomSelectStyle
      getPopupContainer={(trigger) => trigger.parentElement}
      size="large"
      className="fhd:h-56 "
      suffixIcon={props.loading ? undefined : <IoMdArrowDropdown size={20} />}
      {...props}
    />
  );
});

export const { Option: CustomOption } = Select;
