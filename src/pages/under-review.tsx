import React from 'react';
import LoadableExport from 'react-loadable';
import Layout from 'src/layouts/layout';
import SEO from 'src/layouts/seo';

const UnderReviewLoadable = LoadableExport({
  loader: () => import('src/sections/UnderReview'),
  loading: () => null,
});

const UnderReview: React.FC = React.memo(() => {
  return (
    <>
      <SEO title="Under Review" />
      <Layout isNonHeader>
        <UnderReviewLoadable />
      </Layout>
    </>
  );
});

export default UnderReview;
