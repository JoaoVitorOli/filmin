import { useDispatch, useSelector } from 'react-redux';
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

import Profile from '../Profile';

import { theme } from '../../styles/theme';
import { styles } from "./styles";

import { changeUserName, changeUserPhoto } from '../../store/modules/user/actions';
import { IUserState } from '../../store';

export function ActionSheetProfile() {
  const dispatch = useDispatch();

  const [inputName, setInputName] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const userPhoto = useSelector<IUserState, string>(state => {
    return state.user.profile;
  });

  async function handleChangeUserName(input: string) {
    dispatch(changeUserName(input));

    // ToastAndroid.showWithGravity(
    //   "All Your Base Are Belong To Us",
    //   ToastAndroid.SHORT,
    //   ToastAndroid.CENTER
    // );
  };

  async function handleSelectImage() {
    const result = await launchImageLibrary({mediaType: "photo"});

    if (result.assets) {
      dispatch(changeUserPhoto(result.assets[0].uri!));

      // toast.show({
      //   title: "Foto alterada",
      //   placement: "top",
      //   backgroundColor: "purple",
      // });
    }
  }

  async function handleDeleteProfileImage() {
    dispatch(changeUserPhoto(""));

    // toast.show({
    //   title: "Foto removida",
    //   placement: "top",
    //   backgroundColor: "purple",
    // });
  }

  return (
    <ActionSheet 
      id="profile_sheet"
      containerStyle={{
        backgroundColor: theme.colors.shape,
        borderTopRightRadius: 8
      }}
    >
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
              opacity: !userPhoto ? 0.3 : 1
            }]}
            activeOpacity={0}
            disabled={!userPhoto}
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
  )
}
