import React from 'react';
import { Modal, Spin } from 'antd';
import { useAppSelector } from 'src/reducers/model';
import styled from '@emotion/styled';
import tw from 'twin.macro';

const LoadingModalStyled = styled(Modal)`
  .ant-modal-content {
    ${tw`bg-transparent shadow-none`}
  }
`;

const LoadingModal = React.memo(() => {
  const countLoading = useAppSelector((state) => state.app.countLoading);
  return (
    <LoadingModalStyled zIndex={1500} closable={false} footer={null} visible={countLoading > 0} centered>
      <section className="flex justify-center">
        <Spin size="large" />
      </section>
    </LoadingModalStyled>
  );
});

export default LoadingModal;
