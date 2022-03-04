import React, { useState } from 'react';
import { 
  Image, 
  Text, 
  View 
} from "react-native";

import MaskedView from "@react-native-community/masked-view";
import LinearGradient from 'react-native-linear-gradient';

import { styles } from "./styles";
import { Profile } from './Profile';
import { TextGradient } from './TextGradient';
import { ButtonAddMovie } from './ButtonAddMovie';
import { ModalAddMovie } from '../ModalAddMovie';

export function Header() {
  const [isModalAddMovieOpen, setIsModalAddMovieOpen] = useState(false);

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
          <Image
            source={require("../../assets/icon.png")}
            style={styles.icon}
          />
          <Text style={styles.textLogo}>FILMIN</Text>

          <Profile />
        </View>

        <View style={styles.middle}>
          <View  style={styles.middleTextWithGradient}>
            <Text style={styles.text}>Qual o</Text>
            <TextGradient text='filmin' />
            <Text style={styles.text}>de hoje,</Text>
          </View>
          
          <Text style={styles.text}>João?</Text>
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
    </View>
  )
}
