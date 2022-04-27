import React, { useState } from 'react';
import { 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
} from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { default as IconFeather } from 'react-native-vector-icons/Feather';
import { default as IconAntDesign } from 'react-native-vector-icons/AntDesign';
import { default as IconEntypo } from 'react-native-vector-icons/Entypo';
import { launchImageLibrary } from "react-native-image-picker";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Toast from 'react-native-toast-message';
import NetInfo from "@react-native-community/netinfo";

import { userInfoState } from '../../recoil/userInfo';
import Profile from '../Profile';

import { theme } from '../../styles/theme';
import { styles } from "./styles";
import { getUserInfo, setUserName, setUserPhoto } from '../../db/services/User';
import { randomName } from '../../utils/randomName';
import { ActionSheetShare } from '../ActionSheetShare';

export function ActionSheetProfile() {
  const userInfoRecoil = useRecoilValue(userInfoState);
  const setUserInfoRecoil = useSetRecoilState(userInfoState);

  const [inputName, setInputName] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

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

  function handleOpenActionSheetShare() {
    let isConnected = true;

    const checkUserConnection = NetInfo.addEventListener(state => {
      isConnected = state.isConnected!;
    });

    checkUserConnection();

    if (isConnected) {
      SheetManager.show("share_sheet");
    } else {
      Toast.show({
        type: 'success',
        text1: 'Sem conexão com a internet.',
      });
    }
  }

  return (
    <>
       <ActionSheet 
        id="profile_sheet"
        containerStyle={{
          backgroundColor: theme.colors.shape,
          borderTopRightRadius: 8
        }}
      >
        <TouchableOpacity
          style={styles.buttonShare}
          activeOpacity={0.8}
          onPress={() => handleOpenActionSheetShare()}
        >
          <IconEntypo
            name="slideshare"
            size={20}
            color={"#d2d2d2"}
          />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.heading}>Personalizar</Text>

          <Profile isClickable={false} />

          <View style={styles.photoEditSection}>
            <TouchableOpacity 
              onPress={() => handleSelectImage()} 
              style={[styles.button, { 
                backgroundColor: theme.colors.purple,
                marginRight: 8
              }]}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Editar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteProfileImage()} 
              style={[styles.button, { 
                backgroundColor: theme.colors.danger,
                opacity: !userInfoRecoil.profile ? 0.3 : 1
              }]}
              activeOpacity={0}
              disabled={!userInfoRecoil.profile}
            >
              <IconFeather
                name="trash"
                size={20}
                color={"#d2d2d2"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.nameEditSection}>
            <TextInput
              placeholder="Mudar nome"
              style={[styles.input, isInputFocused && styles.inputFocused]}
              value={inputName}
              onChangeText={(value) => setInputName(value)}
              selectionColor={theme.colors.text}
              placeholderTextColor={theme.colors.gray}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <TouchableOpacity 
              onPress={() => handleChangeUserName(inputName)} 
              style={[styles.button, { backgroundColor: theme.colors.purple }]}
              activeOpacity={0.8}
            >
              <IconAntDesign 
                name="edit"
                size={15}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ActionSheet>

      <ActionSheetShare />
    </>
  )
}
