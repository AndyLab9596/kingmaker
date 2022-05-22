import React from 'react';
import store from './src/config/storeRedux';
import MainApp from './main-app';

import 'antd/dist/antd.css';
import 'src/styles/global.css';

export const wrapRootElement = ({ element }) => {
  return <MainApp reduxStore={store} element={element} />;
};
