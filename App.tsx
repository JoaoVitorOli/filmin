import React from 'react';
import { StatusBar } from 'react-native';
import { RecoilRoot } from 'recoil';
import Toast from 'react-native-toast-message';

import { AppContainer } from './src/components/AppContainer';
import Header from './src/components/Header';

import { theme } from './src/styles/theme';
import { toastConfig } from './src/config/CustomToastConfig';
import { TabNavigation } from './src/components/TabNavigation';

const App = () => {
  return (
    <RecoilRoot>
      <AppContainer>
        <StatusBar 
          barStyle={'light-content'}
          backgroundColor={theme.colors.shape}
        />
        <Header />

        <TabNavigation />

        <Toast config={toastConfig} />
      </AppContainer>
    </RecoilRoot>
  );
};

export default App;
