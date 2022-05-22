import { Result } from 'antd';
import React from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { CustomButton } from '../form';
const CommingSoon = () => {
  const { logOut } = useAuth();
  return (
    <Result
      title="Coming Soon"
      icon={<></>}
      extra={
        <CustomButton className="w-150" onClick={() => logOut(false)} danger type="primary">
          Log Out
        </CustomButton>
      }
    />
  );
};

export default CommingSoon;
