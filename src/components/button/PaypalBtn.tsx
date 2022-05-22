import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import PaypalLogo from 'src/assets/images/paypal-logo.png';

interface PaypalButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}

const StyledButton = styled.button`
  ${tw`fhd:(h-56 leading-30 text-20) text-12 leading-18 h-44 rounded-7 font-lato-semibold px-10 w-full flex items-center justify-center`}

  ${tw`border-yellow bg-yellow shadow-yellow hover:(bg-yellow-light border-yellow-light) text-black`}
  span {
    ${tw`mr-5`}
  }
`;
export const PaypalButton: React.FC<PaypalButtonProps> = React.memo((props) => {
  const { text, ...resp } = props;
  return (
    <StyledButton {...resp}>
      <span> {text}</span>
      <img src={PaypalLogo} />
    </StyledButton>
  );
});
