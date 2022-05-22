import React from 'react';
import PrivateProvider from 'src/components/providers/PrivateProvider';
import SEO from 'src/layouts/seo';
import Layout from 'src/layouts/layout';
import ProfileEditLoadable from 'src/sections/ProfileEdit';

const EditProfile = () => {
  return (
    <>
      <SEO title="Edit Profile" />
      <PrivateProvider>
        <Layout isNonHeader>
          <ProfileEditLoadable />
        </Layout>
      </PrivateProvider>
    </>
  );
};

export default React.memo(EditProfile);
