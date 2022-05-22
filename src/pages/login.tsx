import React, { useEffect, useMemo, useState } from 'react';
import PublicProvider from 'src/components/providers/PublicProvider';
import { useAuth } from 'src/hooks/useAuth';
import { getParamsUrl } from 'src/hooks/useQueryParam';
import SEO from 'src/layouts/seo';
import Waiting from 'src/layouts/waiting';
import LoginLoadable from 'src/sections/Login';
import NewPasswordModalLoadable, { NewPasswordType } from 'src/sections/Login/NewPasswordModal';

export enum LoginParamTypes {
  resetPassword = 'reset-password/',
}

type ParamsUrl = NewPasswordType;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const { basicLogOut } = useAuth();
  const params = useMemo(() => getParamsUrl<ParamsUrl>(), []);

  useEffect(() => {
    if (params && params.token && params.type === LoginParamTypes.resetPassword) {
      basicLogOut().then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <React.Fragment>
      <SEO title="Sign In" />
      {loading ? (
        <Waiting />
      ) : (
        <>
          <PublicProvider>
            <LoginLoadable />
          </PublicProvider>
          <NewPasswordModalLoadable />
        </>
      )}
    </React.Fragment>
  );
};

export default LoginPage;
