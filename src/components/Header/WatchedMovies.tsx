import React, { useState } from 'react';
import { 
  Text, 
  View 
} from "react-native";
import FastImage from 'react-native-fast-image';

import Profile from '../Profile';
import { ButtonAddMovie } from './ButtonAddMovie';
import { ModalAddMovie } from '../ModalAddMovie';
import { ActionSheetProfile } from '../ActionSheetProfile';

import { styles } from "./styles";
import { useSelector } from 'react-redux';
import { IMoviesWatched, IMoviesWatchedState, IUserState } from '../../store';
import { database } from '../../db/index.native';
import withObservables from '@nozbe/with-observables';

interface IMoviesItemProps {
  id: string;
  name: string;
  posterPath: string;
  movieAverange: string;
  movieDate: string;
  movieStatus: string;
}

interface MovieListProps {
  movies: IMoviesItemProps[];
}

function WatchedMovies({ movies }: MovieListProps) {
  // console.log(movies[0]);

  // function getCheckedMovies() {
  //   let count = 0;

  //   movies.filter(movie => {
  //     if (movie.movieStatus === "true") count++
  //   });

  //   return count;
  // }

  const moviesWatched = useSelector<IMoviesWatchedState, number>(state => {
    return state.moviesWatched.count;
  });

  return (
    <Text style={styles.textSmall}>
      {moviesWatched} filmes assistidos
    </Text>
  )
}

const db = database.collections.get('movies');
const observeMovies = () => db.query().observe();

const enhance = withObservables([], () => ({
  movies: observeMovies(),
}));

// @ts-ignore
export default enhance(WatchedMovies);
