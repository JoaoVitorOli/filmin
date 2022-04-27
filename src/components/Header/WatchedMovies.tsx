import React from 'react';
import { 
  Text, 
} from "react-native";

import { styles } from "./styles";
import { useRecoilValue } from 'recoil';
import { moviesWatchedState } from '../../recoil/watchedMovies';

export default function WatchedMovies() {
  const moviesWatched = useRecoilValue(moviesWatchedState);

  return (
    <Text style={styles.textSmall}>
      {moviesWatched} filmes assistidos
    </Text>
  )
}
