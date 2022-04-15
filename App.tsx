import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { RecoilRoot, useSetRecoilState } from 'recoil';

import { AppContainer } from './src/components/AppContainer';
import Header from './src/components/Header';
import MovieList from './src/components/MovieList';

import { theme } from './src/styles/theme';

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
      </AppContainer>
    </RecoilRoot>
  );
};

export default App;
