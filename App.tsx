import React from 'react';
import { StatusBar } from 'react-native';
import { RecoilRoot } from 'recoil';
import Toast, { BaseToast, ToastOptions } from 'react-native-toast-message';

import { AppContainer } from './src/components/AppContainer';
import Header from './src/components/Header';
import MovieList from './src/components/MovieList';

import { theme } from './src/styles/theme';
import { toastConfig } from './src/config/CustomToastConfig';

const App = () => {
  return (
    <RecoilRoot>
      <AppContainer>
        <StatusBar 
          barStyle={'light-content'}
          backgroundColor={theme.colors.shape}
        />
        <Header />

        <MovieList />

        <Toast config={toastConfig} />
      </AppContainer>
    </RecoilRoot>
  );
};

export default App;
