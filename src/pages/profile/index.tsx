import React from 'react';
import SEO from 'src/layouts/seo';
import Loadable from 'react-loadable';
import PrivateProvider from 'src/components/providers/PrivateProvider';
import Layout from 'src/layouts/layout';

const ProfileLoadable = Loadable({
  loader: () => import('src/sections/Profile'),
  loading: () => null,
});

const ProfilePage: React.FC = () => {
  return (
    <>
      <SEO title="Profile" />
      <PrivateProvider>
        <Layout isNonHeader>
          <ProfileLoadable />
        </Layout>
      </PrivateProvider>
    </>
  );
};

export default ProfilePage;
