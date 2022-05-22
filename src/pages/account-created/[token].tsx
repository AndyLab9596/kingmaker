import { message } from 'antd';
import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import { apiIns } from 'src/config/apiClient';
import Waiting from 'src/layouts/waiting';
import { Path } from 'src/utils/const';

interface ActiveAccountByTokenProps {
  token: string;
}
const ActiveAccountByToken: React.FC<ActiveAccountByTokenProps> = (props) => {
  const verifyAccount = async () => {
    try {
      const auth = await apiIns.auth.verifyEmail(props.token);
      await apiIns.auth.setAuthToken(auth);
      navigate(Path.ACCOUNT_SUCCESS_CREATE);
    } catch (error: any) {
      navigate(Path.LOGIN);
      message.error(error.message);
    }
  };
  useEffect(() => {
    verifyAccount();
  }, []);

  return <Waiting />;
};

export default ActiveAccountByToken;
