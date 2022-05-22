import React from 'react';
import Loadable from 'react-loadable';
import Layout from 'src/layouts/layout';
import SEO from 'src/layouts/seo';

const FooterInfo = Loadable({
  loader: () => import('src/sections/FooterInfo'),
  loading: () => null,
});

const PrivacyPolicy: React.FC = React.memo(() => {
  return (
    <>
      <SEO title="Privacy & Policy" />
      <Layout isNonHeader>
        <FooterInfo />
      </Layout>
    </>
  );
});

export default PrivacyPolicy;
