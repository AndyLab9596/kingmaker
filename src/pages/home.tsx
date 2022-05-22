import React from 'react';
import Loadable from 'react-loadable';
import PrivateProvider from 'src/components/providers/PrivateProvider';
import SEO from 'src/layouts/seo';

const HomeLoadable = Loadable({
  loader: () => import('src/sections/Home'),
  loading: () => null,
});
const HomePage: React.FC = () => {
  return (
    <>
      <SEO title="Home" />
      <PrivateProvider>
        <HomeLoadable />
      </PrivateProvider>
    </>
  );
};

export default HomePage;
