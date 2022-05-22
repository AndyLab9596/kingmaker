import React from 'react';
import Loadable from 'react-loadable';
import SEO from 'src/layouts/seo';

const MarketingLoadable = Loadable({
  loader: () => import('src/sections/Marketing'),
  loading: () => null,
});

const MarketingPage: React.FC = () => {
  return (
    <React.Fragment>
      <SEO title="Introduction" />
      <MarketingLoadable />
    </React.Fragment>
  );
};

export default MarketingPage;
