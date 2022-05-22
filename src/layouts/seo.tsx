/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import globalVariable from 'src/config/env';
import logo from 'src/assets/images/large-logo.svg';
interface SEOProps {
  description?: string;
  lang?: string;
  meta?: any[];
  title?: string;
}

const SEO: React.FC<SEOProps> = ({ description = '', lang = 'en', meta = [], title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: 'google-site-verification',
          content: globalVariable.GOOGLE_SITE_VERIFICATION,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: 'og:image',
          content: logo,
        },
        {
          name: `twitter:card`,
          content: `goldfishcode gatsby template`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author.name || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
