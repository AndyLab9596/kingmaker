import React from 'react';
import Loadable from 'react-loadable';
import PrivateProvider from 'src/components/providers/PrivateProvider';
import SEO from 'src/layouts/seo';
import Layout from 'src/layouts/layout';

const DashboardLoadable = Loadable({
  loader: () => import('src/sections/Dashboard'),
  loading: () => null,
});

const DashBoardPage: React.FC = () => {
  return (
    <>
      <SEO title="Dash Board" />
      <PrivateProvider>
        <Layout isNonFooter>
          <DashboardLoadable />
        </Layout>
      </PrivateProvider>
    </>
  );
};

export default DashBoardPage;
