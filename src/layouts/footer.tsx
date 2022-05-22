import { css, useTheme } from '@emotion/react';
import { Link } from 'gatsby';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Path } from 'src/utils/const';
import tw from 'twin.macro';

const Footer: React.FC = React.memo(() => {
  const theme = useTheme();

  return (
    <div
      css={css`
        height: 60px;
        min-height: 60px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #d5d5d5;
        .footer-content {
          display: flex;
          margin-bottom: 0;
          list-style-type: none;
        }
        .footer-item {
          padding: 0px 12px;
          transition: all 0.7 linear;
          font-size: ${theme.textSize.xs};
          cursor: pointer;
          ${tw`text-white text-opacity-50 border-white border-r border-opacity-50 fhd:text-18 text-14 font-lato-semibold`}
          &:last-child {
            border-right: none;
          }
          &:hover {
            text-decoration: underline;
            transition: all 0.7 linear;
            ${tw`text-opacity-100`}
          }
        }
      `}
    >
      <div className="footer-content">
        <a className="footer-item" href="mailto:info@kingmakerdata.com">
          <span>Contact Us</span>
        </a>
        <Link to={Path.TERMS_AND_CONDITIONS} className="footer-item">
          <span>Terms & Conditions</span>
        </Link>
        <Link to={Path.PRIVACY} className="footer-item">
          <span>Privacy Policy</span>
        </Link>
      </div>
    </div>
  );
}, isEqual);

export default Footer;
