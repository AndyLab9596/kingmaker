import { navigate } from 'gatsby';
import React from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { getParamsUrl } from 'src/hooks/useQueryParam';
import { useAppSelector } from 'src/reducers/model';
import { Path } from 'src/utils/const';

interface ParamsUrl {
  redirect_url?: string;
}

const PublicProvider: React.FC = ({ children }) => {
  const isLogged = useAppSelector((state) => state.auth.isLogged);
  const { checkFlowLogin } = useAuth();
  React.useEffect(() => {
    if (isLogged === true) {
      const params = getParamsUrl<ParamsUrl>();
      if (!params || !params.redirect_url) {
        navigate(Path.DASHBOARD);
      }
    } else if (isLogged === null) {
      checkFlowLogin();
    }
  }, [isLogged]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default PublicProvider;
