import React from 'react';
import SEO from 'src/layouts/seo';
import Loadable from 'react-loadable';
import Layout from 'src/layouts/layout';
import PrivateProvider from 'src/components/providers/PrivateProvider';

const AccountSuccessCreateLoadable = Loadable({
  loader: () => import('src/sections/AccountSuccessCreate'),
  loading: () => null,
});

const AccountSuccessCreate = () => {
  return (
    <>
      <SEO title="Account Created" />
      <PrivateProvider>
        <Layout isNonHeader>
          <AccountSuccessCreateLoadable />
        </Layout>
      </PrivateProvider>
    </>
  );
};

export default AccountSuccessCreate;
