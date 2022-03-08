import React, { useEffect, useState } from 'react';
import { 
  Image, 
  Text, 
  View 
} from "react-native";

import { Profile } from '../Profile';
import { TextGradient } from './TextGradient';
import { ButtonAddMovie } from './ButtonAddMovie';
import { ModalAddMovie } from '../ModalAddMovie';
import { ActionSheetProfile } from '../ActionSheetProfile';

import { getUserInfo } from '../../db/services/User';
import { randomName } from '../../utils/randomName';

import { styles } from "./styles";
import withObservables from '@nozbe/with-observables';

export function Header() {
  const [isModalAddMovieOpen, setIsModalAddMovieOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function verifyUserName() {
      const entries = await getUserInfo();

      if (entries && entries[0].name) {
        setUserName(entries[0].name);

        return;
      }

      setUserName(randomName());
    }

    verifyUserName();
  }, []);

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

          <View style={styles.profileContainer}>
            <Profile />
          </View>
        </View>

        <View style={styles.middle}>
          <View  style={styles.middleTextWithGradient}>
            <Text style={styles.text}>Qual o</Text>
            <TextGradient text='filmin' />
            <Text style={styles.text}>de hoje,</Text>
          </View>
          
          <Text style={styles.text}>{userName}?</Text>
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

// const enhance = withObservables(['user'], ({ user }) => ({
//   user
// }));

// const EnhancedHeader = enhance(Header);
// export default EnhancedHeader;
