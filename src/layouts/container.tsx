import { css, useTheme } from '@emotion/react';
import React from 'react';

const Container: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <div
      className="app-container"
      css={css`
        height: 100%;
        max-width: ${theme.layout.maxWidth}px;
        margin: 0 auto;
        padding: 0 24px;
      `}
    >
      {children}
    </div>
  );
};

export default Container;
