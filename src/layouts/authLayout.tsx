import React, { ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';
import KingLogo from 'src/assets/images/large-logo.svg';
import Logo from 'src/components/logo';
import AuthImage from 'src/assets/images/auth-img.png';
import tw from 'twin.macro';
import Footer from './footer';
interface Props {
  children: ReactElement;
  title?: string;
  subChildren?: ReactElement;
}

export const AuthLayout = (props: Props) => {
  const theme = useTheme();
  const { children, title, subChildren } = props;
  return (
    <div
      css={css`
        .content-wrapper {
          display: flex;
          min-height: calc(100vh - 60px);
          height: 100%;
          &__main {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 0;
          }
          &__sub {
            width: 50%;
            background-position: center;
            background-size: cover;
            background-image: url(${AuthImage});
            position: relative;
          }
        }

        .main-content {
          width: 100%;
          margin-right: auto;
          margin-left: auto;
        }

        .title {
          ${tw`fhd:text-39 text-30`}
          margin: 10px 0;
          margin-bottom: 0;
          color: ${theme.backgroundColor.buttonRed};
        }
      `}
    >
      <div className="content-wrapper">
        <div className="content-wrapper__main">
          <div className="logo">
            <Logo
              css={css`
                height: 100px;
              `}
              className="app-logo"
              src={KingLogo}
            />
          </div>
          <h1 className="title text-red font-lato-bold">{title}</h1>
          <div className="main-content">{children}</div>
        </div>
        <div className="content-wrapper__sub">{subChildren}</div>
      </div>

      <Footer />
    </div>
  );
};
