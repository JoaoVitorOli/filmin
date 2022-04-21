import React, { useState } from 'react';
import { 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { default as IconFeather } from 'react-native-vector-icons/Feather';
import { default as IconAntDesign } from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from "react-native-image-picker";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Toast from 'react-native-toast-message';

import { userInfoState } from '../../recoil/userInfo';
import Profile from '../Profile';

import { theme } from '../../styles/theme';
import { styles } from "./styles";
import { getUserInfo, setUserName, setUserPhoto } from '../../db/services/User';
import { randomName } from '../../utils/randomName';
import { InputCode } from './InputCode';

export function ActionSheetShare() {
  const userInfoRecoil = useRecoilValue(userInfoState);
  const setUserInfoRecoil = useSetRecoilState(userInfoState);

  const [inputCode, setInputCode] = useState("");

  async function handleChangeUserName(input: string) {
    try {
      const userInfo = await getUserInfo();
  
      if (userInfo) {
        const userName = input ? input : randomName();

        await setUserName(userName, userInfo[0].id);
  
        setUserInfoRecoil({
          id: 1,
          name: userName,
          profile: userInfoRecoil.profile
        });

        Toast.show({
          type: 'success',
          text1: 'Nome alterado com sucesso!',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function handleSelectImage() {
    const result = await launchImageLibrary({mediaType: "photo"});

    if (result.assets) {
      try {
        const userInfo = await getUserInfo();
    
        if (userInfo) {
          await setUserPhoto(result.assets[0].uri!, userInfo[0].id);
    
          setUserInfoRecoil({
            id: 1,
            name: userInfo[0].name,
            profile: result.assets[0].uri!
          });

          Toast.show({
            type: 'success',
            text1: 'Imagem alterada com sucesso!',
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handleDeleteProfileImage() {
    try {
      const userInfo = await getUserInfo();
  
      if (userInfo) {
        await setUserPhoto("", userInfo[0].id);
  
        setUserInfoRecoil({
          id: 1,
          name: userInfo[0].name,
          profile: ""
        });

        Toast.show({
          type: 'success',
          text1: 'Imagem deletada com sucesso!',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ActionSheet 
      id="share_sheet"
      containerStyle={{
        backgroundColor: theme.colors.shape,
        borderTopRightRadius: 8
      }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Compartilhar</Text>
        
        <Text style={styles.text}>Adicione o filme de seus amigos, basta colar o código:</Text>

        <View style={styles.inputContainer}>
          <InputCode
            setText={setInputCode}
            value={inputCode}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonDownloadMovies}
          >
            <IconAntDesign
              name="download"
              size={20}
              color={"#d2d2d2"}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>Ou copie seu código e mande para seus amigos:</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonDownloadMovies}
        >
          <Text style={styles.text}>Gerar código</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  )
}
