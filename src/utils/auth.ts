import { User } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/user/models';
import { navigate } from 'gatsby';

export const forceLogout = (): void => {
  localStorage.clear();
  if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
    navigate(`/login/?redirect_url=${window.location.pathname}${window.location.search}`);
  }
};

export const checkingProfileAvailable = (myProfile?: User): void => {
  if (!window) return;
  const pathName = window.location.pathname;
  if (typeof window !== 'undefined' && (pathName === '/' || pathName.includes('/login')) && myProfile?.id) {
    navigate('/home/');
  }
};
