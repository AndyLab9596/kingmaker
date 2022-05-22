import React from 'react';
import PublicProvider from 'src/components/providers/PublicProvider';
import Loadable from 'react-loadable';
import SEO from 'src/layouts/seo';

const RegisterLoadable = Loadable({
  loader: () => import('src/sections/Register'),
  loading: () => null,
});

const RegisterPage: React.FC = () => {
  return (
    <>
      <SEO title="Create Account" />
      <PublicProvider>
        <RegisterLoadable />
      </PublicProvider>
    </>
  );
};

export default RegisterPage;
