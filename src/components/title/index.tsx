import { css } from '@emotion/react';
import React from 'react';
import isEqual from 'react-fast-compare';

interface TitleProps {
  className?: string;
}

const Title: React.FC<TitleProps> = React.memo(({ children, className }) => {
  return (
    <h1
      className={className}
      css={css`
        font-size: 36px;
        font-weight: 700;
      `}
    >
      {children}
    </h1>
  );
}, isEqual);

export default Title;
