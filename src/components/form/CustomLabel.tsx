import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';

const StyledLabel = styled.label`
  ${tw`fhd:(text-25 leading-30) text-16 leading-18 font-lato-semibold`}
`;

interface CustomLabelProps {
  className?: string;
}
export const CustomLabel: React.FC<CustomLabelProps> = React.memo((props) => {
  const { children, className = '' } = props;
  return <StyledLabel className={className}>{children}</StyledLabel>;
});

interface HeaderModalProps {
  className?: string;
}
export const HeaderModal: React.FC<HeaderModalProps> = React.memo((props) => {
  const { children, className = '' } = props;
  return (
    <p className={`font-lato-semibold fhd:text-25 text-17 text-red flex justify-center ${className}`}>{children}</p>
  );
});

export const SubHeaderModal: React.FC<HeaderModalProps> = React.memo((props) => {
  const { children, className = '' } = props;
  return <p className={`fhd:text-25 font-lato-semibold text-17 ${className}`}>{children}</p>;
});
