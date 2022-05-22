import { ArrowLeftOutlined } from '@ant-design/icons';
import { navigate } from 'gatsby';
import React from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { Path } from 'src/utils/const';
import { CustomLabel } from '.';

export const GoBack: React.FC = React.memo(() => {
  const { logOut } = useAuth();
  const handleGoBack = () => {
    if (window.location.pathname === Path.PAYMENT) {
      logOut();
    } else {
      navigate(-1);
    }
  };

  return (
    <CustomLabel className="text-gray-2 flex justify-center">
      <a className="flex items-center gap-x-5 hover:text-red" onClick={handleGoBack}>
        <ArrowLeftOutlined />
        Go Back
      </a>
    </CustomLabel>
  );
});
