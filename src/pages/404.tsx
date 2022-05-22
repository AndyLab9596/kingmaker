import React from 'react';
import { Result } from 'antd';
import SEO from 'src/layouts/seo';

const NotFoundPage: React.FC = React.memo(() => (
  <>
    <SEO title="404 Not Found" />
    <Result
      status="404"
      title="404 Not Found"
      subTitle="Sorry, The page is not existing or you have not permission to access it!"
    />
  </>
));

export default NotFoundPage;
