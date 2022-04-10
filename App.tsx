import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { AppContainer } from './src/components/AppContainer';
import Header from './src/components/Header';
import MovieList from './src/components/MovieList';

import { store } from './src/store';

import { theme } from './src/styles/theme';

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
