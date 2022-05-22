import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import appTheme from 'src/styles/theme';
import { withTranslation } from 'react-i18next';
import LoadingModal from 'src/components/loading/LoadingModal';
import { initSDKService } from './src/config/apiClient';
import initI18nService from './src/config/i18n';
import ErrorBoundary from 'src/config/ErrorBoundary';

const MainApp = ({ reduxStore, element }) => {
  initI18nService();
  initSDKService();
  return (
    <ErrorBoundary>
      <Provider store={reduxStore}>
        <ThemeProvider theme={appTheme}>{element}</ThemeProvider>
        <LoadingModal />
      </Provider>
    </ErrorBoundary>
  );
};

export default withTranslation()(MainApp);
