import React from 'react';
import Loadable from 'react-loadable';
import PublicProvider from 'src/components/providers/PublicProvider';
import SEO from 'src/layouts/seo';

const DemoLoadable = Loadable({
  loader: () => import('src/sections/Demo'),
  loading: () => null,
});
const LoginPage: React.FC = () => {
  return (
    <React.Fragment>
      <SEO title="Request Demo" />
      <PublicProvider>
        <DemoLoadable />
      </PublicProvider>
    </React.Fragment>
  );
};

export default LoginPage;
