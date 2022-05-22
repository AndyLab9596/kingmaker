import { css } from '@emotion/react';
import React from 'react';
import SignUpForm from 'src/components/signup-form';
import { AuthLayout } from 'src/layouts/authLayout';

const RequestDemo: React.FC = React.memo(() => {
  return (
    <AuthLayout title="SIGN UP">
      <div
        css={css`
          width: 60%;
          margin: 0 auto;
        `}
      >
        <SignUpForm isDemo />
      </div>
    </AuthLayout>
  );
});

export default RequestDemo;
