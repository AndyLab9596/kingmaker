import { navigate } from 'gatsby';
import { useEffect } from 'react';
import { useAppSelector } from 'src/reducers/model';
import { Path } from 'src/utils/const';

export const useIgnorePayment = () => {
  const profile = useAppSelector((state) => state.auth.myProfile);
  useEffect(() => {
    if (profile && profile.payment_complete) {
      navigate(Path.DASHBOARD);
    }
  }, []);
};
