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

export function Header() {
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
          <Text style={styles.textSmall}>0 filmes assistidos</Text>

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
