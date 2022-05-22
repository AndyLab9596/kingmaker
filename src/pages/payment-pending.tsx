import React from 'react';
import Loadable from 'react-loadable';
import PrivateProvider from 'src/components/providers/PrivateProvider';
import Layout from 'src/layouts/layout';
import SEO from 'src/layouts/seo';

const PaymentPendingLoadable = Loadable({
  loader: () => import('src/sections/PaymentPending'),
  loading: () => null,
});
const PaymentPendingPage: React.FC = () => {
  return (
    <React.Fragment>
      <SEO title="Payment pending" />
      <PrivateProvider>
        <Layout isNonHeader>
          <PaymentPendingLoadable />
        </Layout>
      </PrivateProvider>
    </React.Fragment>
  );
};

export default PaymentPendingPage;
