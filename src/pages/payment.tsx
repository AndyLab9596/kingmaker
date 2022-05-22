import React from 'react';
import Loadable from 'react-loadable';
import PrivateProvider from 'src/components/providers/PrivateProvider';
import SEO from 'src/layouts/seo';

const PaymentLoadable = Loadable({
  loader: () => import('src/sections/Payment'),
  loading: () => null,
});
const PaymentPage: React.FC = () => {
  return (
    <React.Fragment>
      <SEO title="Payment" />
      <PrivateProvider>
        <PaymentLoadable />
      </PrivateProvider>
    </React.Fragment>
  );
};

export default PaymentPage;
