import { css } from '@emotion/react';
import { navigate } from 'gatsby';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/reducers/model';
import isEqual from 'react-fast-compare';
import { Path } from 'src/utils/const';

interface LogoProps {
  className?: string;
  src?: any;
  url?: string;
}

const Logo: React.FC<LogoProps> = React.memo((props) => {
  const { className, src, url } = props;
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.myProfile?.id);
  const goToHomePage = () => {
    if (!isLoggedIn) {
      navigate(url || '/');
    } else {
      navigate(url || Path.DASHBOARD);
    }
  };

  return (
    <div
      className={className}
      css={css`
        width: auto;
        height: 70px;
        cursor: pointer;
        & > img {
          width: 100%;
          height: 100%;
        }
      `}
      onClick={goToHomePage}
    >
      <img src={src} alt="app_logo" />
    </div>
  );
}, isEqual);

export default Logo;
