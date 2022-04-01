import { Model } from '@nozbe/watermelondb';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider, useDispatch } from 'react-redux';

import { AppContainer } from './src/components/AppContainer';
import { Header } from './src/components/Header';
import MovieList from './src/components/MovieList';
import { database } from './src/db/index.native';
import { getAllMovies } from './src/db/services/Movie';

import { createNewUser, getUserInfo } from './src/db/services/User';
import { store } from './src/store';

import { theme } from './src/styles/theme';
import { randomName } from './src/utils/randomName';

type MovieProps = {
  id: string | number;
  name: string;
  posterPath: string;
  averange: number;
  date: string;
  isChecked: boolean;
}

const App = () => {
  // const [movies, setMovies] = useState<Model[]>([]);

  // useEffect(() => {
  //   const getMovies = async () => {
  //     // const moviesFetched = await getAllMovies();
  
  //     // setMovies(moviesFetched!);
  
  //     const moviesCollection = database.get("movies");
  
  //     const entries = await moviesCollection.query().fetch();

  //     console.log(entries);
  
  //     setMovies(entries);
  //   };
  
  //   getMovies();
  // }, []);

  return (
    <Provider store={store}>
      <AppContainer>
        <StatusBar 
          barStyle={'light-content'}
          backgroundColor={theme.colors.shape}
        />
          <Header />

          {/* @ts-ignore */ }
          <MovieList />
      </AppContainer>
    </Provider>
  );
};

export default App;
