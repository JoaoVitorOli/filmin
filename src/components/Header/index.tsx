import React, { useState } from 'react';
import { 
  Text, 
  View 
} from "react-native";
import FastImage from 'react-native-fast-image';

import Profile from '../Profile';
import WatchedMovies from './WatchedMovies';
import { ButtonAddMovie } from './ButtonAddMovie';
import { ModalAddMovie } from '../ModalAddMovie';
import { ActionSheetProfile } from '../ActionSheetProfile';
import { moviesWatchedState } from '../../recoil/watchedMovies';

import { styles } from "./styles";
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/userInfo';
import { ButtonDeleteAllWatchedMovies } from './ButtonDeleteAllWatchedMovies';

export default function Header() {
  const [isModalAddMovieOpen, setIsModalAddMovieOpen] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const moviesWatched = useRecoilValue(moviesWatchedState);

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
          
          {userInfo.name ? (
            <Text 
              ellipsizeMode='tail'
              numberOfLines={1}
              style={[styles.text, { width: "85%" }]}
            >
              {userInfo.name}?
            </Text>
          ) : (
            <View style={styles.nameSkeleton} />
          )}
        </View>

        <View style={styles.bottom}>
          <WatchedMovies />

          <View style={styles.bottomButtonsContainer}>
            {moviesWatched > 0 && (
              <ButtonDeleteAllWatchedMovies />
            )}

            <ButtonAddMovie
              handleOpenModal={handleOpenModalAddMovie}
            />
          </View>
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
