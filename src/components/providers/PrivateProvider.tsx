import { navigate } from 'gatsby-link';
import React, { useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import Waiting from 'src/layouts/waiting';
import { useAppSelector } from 'src/reducers/model';
import { Path } from 'src/utils/const';

const PrivateProvider: React.FC = (props) => {
  const { children } = props;

  const [loading, setLoading] = useState(true);
  const isLogged = useAppSelector((state) => state.auth.isLogged);
  const myProfile = useAppSelector((state) => state.auth.myProfile);
  const { logOut, checkFlowLogin, checkRefreshToken } = useAuth();

  const checkAuth = async () => {
    if (isLogged === false) {
      logOut();
    } else if (isLogged === null) {
      await checkFlowLogin();
    } else {
      // keep login
      await checkRefreshToken(logOut);
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, [isLogged]);

  React.useEffect(() => {
    if (myProfile) {
      if (myProfile.is_under_review) {
        navigate(Path.UNDER_REVIEW);
      } else if (
        myProfile.payment_method === 'Manual' &&
        !myProfile.payment_complete &&
        window.location.pathname !== Path.PAYMENT_PENDING
      ) {
        navigate(Path.PAYMENT_PENDING);
      } else if (
        !myProfile.is_demo_account &&
        !myProfile.payment_complete &&
        window.location.pathname !== Path.PAYMENT &&
        (!myProfile.payment_method || myProfile.payment_method === 'Paypal')
      ) {
        navigate(Path.PAYMENT);
      } else {
        setLoading(false);
      }
    }
  }, [myProfile]);

  return <React.Fragment>{!loading ? children : <Waiting />}</React.Fragment>;
};

export default PrivateProvider;
