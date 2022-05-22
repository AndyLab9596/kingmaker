import { navigate } from 'gatsby-link';
import React, { useEffect } from 'react';
import Waiting from 'src/layouts/waiting';
import { authAction } from 'src/reducers/auth/action';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';
import { Path } from 'src/utils/const';

const MarketingSection: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isLogged);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isAuth) {
      navigate(Path.DASHBOARD);
    } else if (isAuth === false) {
      navigate(Path.LOGIN);
    } else if (isAuth === null) {
      dispatch(authAction.getMyProfile());
    }
  }, [isAuth]);
  return <Waiting />;
};

export default MarketingSection;
