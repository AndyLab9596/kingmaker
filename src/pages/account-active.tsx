import React from 'react';
import LoadableExport from 'react-loadable';
import Layout from 'src/layouts/layout';
import SEO from 'src/layouts/seo';

const AccountActiveLoadable = LoadableExport({
  loader: () => import('src/sections/AccountActive'),
  loading: () => null,
});

const AccountActive: React.FC = React.memo(() => {
  return (
    <>
      <SEO title="Account Active" />
      <Layout isNonHeader>
        <AccountActiveLoadable />
      </Layout>
    </>
  );
});

export default AccountActive;
