import React from 'react';
import { StatusBar } from 'react-native';
import { Background } from './src/components/Background';
import { Header } from './src/components/Header';
import { MovieList } from './src/components/MovieList';

import { theme } from './src/styles/theme';

const App = () => {
  return (
    <Background>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor={theme.colors.shape}
      />
        <Header />
        <MovieList />
    </Background>
  );
};

export default App;
