import React from 'react';
import { Helmet } from 'react-helmet';
import MainApp from './main-app';
import store from './src/config/storeRedux';

import 'antd/dist/antd.css';
import 'src/styles/global.css';

export const wrapRootElement = ({ element }) => {
  return <MainApp reduxStore={store} element={element} />;
};

// A trick to order helmet meta tags with emotion style.
// You can remove this if you don't need to use SEO in your project

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes, setBodyAttributes }, pluginOptions) => {
  const helmet = Helmet.renderStatic();
  setHtmlAttributes(helmet.htmlAttributes.toComponent());
  setBodyAttributes(helmet.bodyAttributes.toComponent());
  setHeadComponents([
    helmet.title.toComponent(),
    helmet.link.toComponent(),
    helmet.meta.toComponent(),
    helmet.noscript.toComponent(),
    helmet.script.toComponent(),
    helmet.style.toComponent(),
  ]);
};

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();

  headComponents.sort((x, y) => {
    if (x.props && x.props['data-react-helmet']) {
      return -1;
    } else if (y.props && y.props['data-react-helmet']) {
      return 1;
    }
    return 0;
  });

  replaceHeadComponents(headComponents);
};
