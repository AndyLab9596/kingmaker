import { navigate } from 'gatsby';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { apiIns } from 'src/config/apiClient';
import { appAction } from 'src/reducers/app/action';
import { authAction } from 'src/reducers/auth/action';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';
import { Path } from 'src/utils/const';

let timeout: NodeJS.Timeout | null = null;
export const checkRefreshToken = async (logOutCallback: () => void) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  const authToken = await apiIns.auth.getAuthToken();
  if (authToken) {
    const { exp } = jwtDecode<{ exp: number }>(authToken.access_token);
    const currentTime = +moment();
    const timeRemaining = exp * 1000 - currentTime;
    // if exp less than 10min trigger refresh
    if (timeRemaining < 10 * 60 * 1000) {
      try {
        await apiIns.auth.refreshToken();
        await checkRefreshToken(logOutCallback);
      } catch (error) {
        logOutCallback();
      }
    }
    // trigger refresh token before 10min
    else {
      timeout = setTimeout(async () => {
        await checkRefreshToken(logOutCallback);
      }, timeRemaining - 10 * 60 * 1000);
    }
  } else {
    // no action
  }
};

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const ignoreRedirect = useAppSelector((state) => state.auth.ignoreRedirect);
  const checkFlowLogin = async () => {
    dispatch(appAction.showLoading());
    const isRemember = localStorage.getItem('remember');
    if (isRemember) {
      await checkRefreshToken(logOut);
    }
    if (ignoreRedirect) {
      dispatch(authAction.setIgnoreRedirect(false));
    } else {
      getProfile();
    }
    dispatch(appAction.hideLoading());
  };
  const getProfile = async () => {
    dispatch(authAction.getMyProfile());
  };

  const basicLogOut = async () => {
    try {
      await apiIns.auth.logout();
      dispatch(authAction.setLogged(false));
    } catch (error) {
      // Do noting
    }
  };

  const logOut = async (keepUrl = true) => {
    try {
      dispatch(appAction.showLoading());
      dispatch(authAction.setIgnoreRedirect(true));
      await basicLogOut().catch(() => {
        // Do noting
      });

      if (timeout) {
        clearTimeout(timeout);
      }
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        if (keepUrl) {
          navigate(`/login/?redirect_url=${window.location.pathname}${window.location.search}`);
        } else {
          navigate(Path.LOGIN, {
            state: {
              forceLogin: true,
            },
          });
        }
      }
    } finally {
      dispatch(appAction.hideLoading());
    }
  };

  return { logOut, basicLogOut, getProfile, checkRefreshToken, checkFlowLogin };
};
