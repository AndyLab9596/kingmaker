/* eslint-disable react/no-unescaped-entities */
import { PageConfigType } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/system/models';
import DOMPurify from 'dompurify';
import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import logoLarge from 'src/assets/images/large-logo.svg';
import { apiIns } from 'src/config/apiClient';
import Waiting from 'src/layouts/waiting';
import { useAppSelector } from 'src/reducers/model';
import { Path } from 'src/utils/const';
import 'twin.macro';

const FooterInfo = React.memo(() => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const isLogged = useAppSelector((state) => state.auth.isLogged);
  const goToHomePage = () => {
    if (!isLogged) {
      navigate('/');
    } else {
      navigate(Path.DASHBOARD);
    }
  };

  const configPage = () => {
    if (window.location.pathname === Path.TERMS_AND_CONDITIONS) return PageConfigType.TERMS_AND_CONDITIONS;
    if (window.location.pathname === Path.PRIVACY) return PageConfigType.PRIVACY_POLICY;
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiIns.system.getPageConfig(configPage());
        const purifyRes = DOMPurify.sanitize(res.content);
        setContent(purifyRes as string);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <>
        <Waiting />
      </>
    );
  }

  return (
    <div className="flex flex-col items-center flex-1 gap-y-40 fhd:gap-y-100 pb-80 pt-68 px-30 ">
      <img
        src={logoLarge}
        alt="Logo Large"
        tw="fhd:(width[240px]) width[140px] cursor-pointer"
        onClick={goToHomePage}
      />
      <div className="max-w-4xl mx-auto">
        <div className="no-css-div" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
});

export default FooterInfo;
