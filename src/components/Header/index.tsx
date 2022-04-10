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
import { IUserState } from '../../store';
import { database } from '../../db/index.native';
import withObservables from '@nozbe/with-observables';
import WatchedMovies from './WatchedMovies';

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

function Header({ movies }: MovieListProps) {
  const [isModalAddMovieOpen, setIsModalAddMovieOpen] = useState(false);

  const userName = useSelector<IUserState, string>(state => {
    return state.user.name;
  });

  function handleCloseModalAddMovie() {
    setIsModalAddMovieOpen(false);
  }

  function handleOpenModalAddMovie() {
    setIsModalAddMovieOpen(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <FastImage
            source={require("../../assets/icon.png")}
            style={styles.icon}
          />
          
          <Text style={styles.textLogo}>FILMIN</Text>

          <View style={styles.profileContainer}>
            <Profile />
          </View>
        </View>

        <View style={styles.middle}>
          <View  style={styles.middleTextWithGradient}>
            <Text style={styles.text}>Qual o</Text>
            <Text style={styles.textGradient}>filmin</Text>
            <Text style={styles.text}>de hoje,</Text>
          </View>
          
          <Text 
            ellipsizeMode='tail'
            numberOfLines={1}
            style={[styles.text, { width: "85%" }]}
          >
            {userName}?
          </Text>
        </View>

        <View style={styles.bottom}>
          <WatchedMovies />

          <ButtonAddMovie
            handleOpenModal={handleOpenModalAddMovie}
          />
        </View>
      </View>

      <ModalAddMovie 
        isVisible={isModalAddMovieOpen}
        closeModal={handleCloseModalAddMovie}
      />

      <ActionSheetProfile />
    </View>
  )
}

const db = database.collections.get('movies');
const observeMovies = () => db.query().observe();

const enhance = withObservables([], () => ({
  movies: observeMovies(),
}));

// @ts-ignore
export default enhance(Header);
