import styled from '@emotion/styled';
import React from 'react';
import Background from 'src/assets/images/profile-left-background2.png';

import tw from 'twin.macro';

const LeftSideStyled = styled.section`
  ${tw`fhd:(width[538px] max-width[none]) w-2/5 max-width[400px] shadow-white pb-30 px-60 hd:px-90 `}
  background-image: url(${Background});
  background-size: cover;
`;

const ProfileLeftLayout: React.FC = React.memo(({ children }) => {
  return <LeftSideStyled>{children}</LeftSideStyled>;
});

export default ProfileLeftLayout;
