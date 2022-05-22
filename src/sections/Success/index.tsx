import { ArrowRightOutlined } from '@ant-design/icons';
import { css, useTheme } from '@emotion/react';
import React from 'react';
import KingLogo from 'src/assets/images/large-logo.svg';
import SuccessImg from 'src/assets/images/success.png';
import { OutlineBtn } from 'src/components/button/OutlineBtn';
import Logo from 'src/components/logo';
import Footer from 'src/layouts/footer';

const DemoSuccess: React.FC = () => {
  const theme = useTheme();
  return (
    <div
      className="success"
      css={css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        padding: 50px 0;

        .success__img {
          width: 300px;
          height: 300px;
          margin: 20px auto;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
        }

        h1 {
          font-size: ${theme.textSize.xxxl};
          color: ${theme.backgroundColor.buttonRed};
        }

        p {
          color: ${theme.text.grayColor};
          font-size: ${theme.textSize.lg};
        }
      `}
    >
      <Logo
        css={css`
          height: 150px;
        `}
        src={KingLogo}
      />
      <div className="success__img">
        <img src={SuccessImg} alt="success" />
      </div>
      <h1>Account is successfully created</h1>
      <p>Kingmaker Data will be in touch with you to schedule a demo</p>
      <div className="button-wrapper">
        <OutlineBtn
          icon={<ArrowRightOutlined />}
          shape="round"
          text="Continue To Dashboard"
          onClick={() => {
            console.log('click');
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default DemoSuccess;
