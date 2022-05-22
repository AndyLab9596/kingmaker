const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
  path: '.env',
});

const siteUrl = process.env.GATSBY_SITE_MAP_URL || 'https://template.dev.goldfishcode.com';
const sentryDSN = process.env.GATSBY_SENTRY_DSN_URL || '';

// Get paths of Gatsby's required rules, which as of writing is located at:
// https://github.com/gatsbyjs/gatsby/tree/fbfe3f63dec23d279a27b54b4057dd611dce74bb/packages/
// gatsby/src/utils/eslint-rules
const gatsbyRequiredRules = path.join(process.cwd(), 'node_modules', 'gatsby', 'dist', 'utils', 'eslint-rules');

module.exports = {
  siteMetadata: {
    title: 'Kingmaker - Data',
    description: 'Kingmaker Data is a data visualization website for prospective political candidates',
    keywords: 'Kingmaker, Kingmaker Data',
    siteUrl,
    author: 'Kingmaker',
    image: '/src/assets/images/large-logo.svg',
  },
  plugins: [
    'gatsby-plugin-preload-fonts',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    'gatsby-plugin-typescript',
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts the following options, all of which are defined by `@emotion/babel-plugin` plugin.
        // The values for each key in this example are the defaults the plugin uses.
        sourceMap: true,
        autoLabel: 'dev-only',
        labelFormat: `[local]`,
        cssPropOptimization: true,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {},
    },
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: siteUrl + '/sitemap.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/404'],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        // Gatsby required rules directory
        rulePaths: [gatsbyRequiredRules],
        // Default settings that may be ommitted or customized
        stages: ['develop', 'build-javascript'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules', 'bower_components', '.cache', 'public'],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'goldfishcode_template',
        short_name: 'goldfishcode_template',
        start_url: `/`,
        icon: `./static/favicon-100x100.png`,
        background_color: `#f7f0eb`,
        theme_color: `#f7f0eb`,
        display: `standalone`,
      },
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: sentryDSN,
      },
    },
  ],
};
