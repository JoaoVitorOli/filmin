import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider, useDispatch } from 'react-redux';

import { AppContainer } from './src/components/AppContainer';
import { Header } from './src/components/Header';
import { MovieList } from './src/components/MovieList';
import { database } from './src/db/index.native';

import { createNewUser, getUserInfo } from './src/db/services/User';
import { store } from './src/store';

import { theme } from './src/styles/theme';
import { randomName } from './src/utils/randomName';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <StatusBar 
          barStyle={'light-content'}
          backgroundColor={theme.colors.shape}
        />
          <Header />
          <MovieList />
      </AppContainer>
    </Provider>
  );
};

export default App;
