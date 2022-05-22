import React from 'react';
import { Modal, ModalProps } from 'antd';
import styled from '@emotion/styled';
import tw from 'twin.macro';

const CustomModalStyled = styled(Modal)`
  &.ant-modal {
    ${tw`fhd:(width[720px]!)`}
  }
`;
export const CustomModal: React.FC<ModalProps> = React.memo((props) => {
  return <CustomModalStyled {...props} />;
});
