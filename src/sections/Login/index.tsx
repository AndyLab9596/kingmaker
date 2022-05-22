import React, { useState } from 'react';
import ForgotPasswordModal from 'src/components/forgot-password-modal';
import { AuthLayout } from 'src/layouts/authLayout';
import LoginForm from './LoginForm';

const LoginSection: React.FC = React.memo(() => {
  const [showModalForgotPwd, setShowModalForgotPwd] = useState(false);
  return (
    <>
      <AuthLayout title="MEMBER LOG IN">
        <LoginForm setShowModalForgotPwd={setShowModalForgotPwd} />
      </AuthLayout>
      <ForgotPasswordModal onShow={setShowModalForgotPwd} visible={showModalForgotPwd} />
    </>
  );
});

export default LoginSection;
